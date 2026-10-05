import { NextAuthConfig } from "next-auth";
import type { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { LoginResponseType } from "../(Auth)/login/login.interface";

interface DecodedToken {
  id: string;
  name: string;
  role: string;
  iat: number;
  exp: number;
}

declare module "next-auth" {
  interface User {
    tkn: string;
    role?: string;
    phone?: string;
    _id?: string;
  }
  interface Session {
    user: {
      tkn: string;
      role?: string;
      phone?: string;
      _id?: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    credantialsToken?: string;
    role?: string;
    phone?: string;
    _id?: string;
  }
}

export const authJsConfing: NextAuthConfig = {
  providers: [
    Credentials({
      name: "Login Frish Cart",
      credentials: {
        email: { placeholder: "Enter Email", type: "email" },
        password: { placeholder: "Enter password", type: "password" },
      },
      authorize: async function (credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          },
        );
        const data: LoginResponseType = await res.json();

        if (data.message === "success" && data.token) {
          // 🔹 فك تشفير التوكن لاستخراج الـ id الحقيقي الخاص بـ FreshCart
          const decoded = jwtDecode<DecodedToken>(data.token);

          return {
            ...data.user,
            _id: decoded.id, // 👈 ده الـ ID الحقيقي اللي كان مش بيوصل
            tkn: data.token,
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt: async function ({ user, token, trigger, session }) {
      if (user) {
        token.credantialsToken = user.tkn;
        token.role = user.role;
        token.phone = user.phone;
        token._id = user._id; // 👈 أصبح يحمل قيمة ID المستخدم
        token.name = user.name;
        token.email = user.email;
      }

      if (trigger === "update" && session) {
        token.name = session.name ?? token.name;
        token.email = session.email ?? token.email;
        token.phone = session.phone ?? token.phone;
      }

      return token;
    },
    session: function ({ session, token }) {
      if (session.user) {
        session.user.tkn = token.credantialsToken as string;
        session.user.role = token.role as string;
        session.user.phone = token.phone as string;
        session.user._id = token._id as string;
      }
      return session;
    },
  },
};
// import { NextAuthConfig } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { LoginResponseType } from "../(Auth)/login/login.interface";
// declare module "next-auth" {
//   interface User {
//     tkn: string;
//   }
// }

// export const authJsConfing: NextAuthConfig = {
//   providers: [
//     Credentials({
//       name: "Login Frish Cart",
//       credentials: {
//         email: { placeholder: "Enter Email", type: "email" },
//         password: { placeholder: "Enter password", type: "password" },
//       },
//       authorize: async function (credentials) {
//         const res = await fetch(
//           `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify(credentials),
//           },
//         );
//         const data: LoginResponseType = await res.json();

//         if (data.message === "success") {
//           return {
//             ...data.user,
//             tkn: data.token,
//           };
//         }

//         return null;
//       },
//     }),
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     jwt: function ({ user, token }) {
//       if (user) {
//         token.credantialsToken = user.tkn;
//       }
//       return token;
//     },
//     session: function (prem) {
//       console.log("peam", prem);
//       return prem.session;
//     },
//   },
// };
