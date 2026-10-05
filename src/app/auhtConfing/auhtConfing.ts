import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Safety net: default is 60s. Raises the ceiling in case any page
  // still gets prerendered and the external API responds slowly.
  staticPageGenerationTimeout: 120,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/Route-Academy-categories/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/Route-Academy-brands/**",
      },
    ],
  },
};

export default nextConfig;// import { NextAuthConfig } from "next-auth";
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
