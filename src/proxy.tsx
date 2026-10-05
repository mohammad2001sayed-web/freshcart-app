import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export default async function proxy(req: NextRequest) {
  const pathName = req.nextUrl.pathname;

  const isAuthPage = pathName === "/login" || pathName === "/register";

  // 🔹 جلب التوكن مع دعم أسماء الـ Cookies بالكامل (سواء Secure أو Normal)
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    raw: false,
    cookieName:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  // 1️⃣ لو المستخدم مسجل دخول وبيحاول يفتح صفحة login أو register -> وجهه للهوم
  if (isAuthPage) {
    if (token) {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return NextResponse.next();
  }

  // 2️⃣ لو مش مسجل دخول وبيحاول يدخل أي صفحة محمية -> وجهه للوجن
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    // إيقاف التوجيه المتكرر لو كان المسار الحالي بالفعل هو login
    if (pathName !== "/login") {
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/shop",
    "/wishlist",
    "/allorders",
    "/Profile",
    "/orders",
    "/contact",
    "/brands",
    "/login",
    "/register",
    "/payment",
    "/Profile/settings",
  ],
};



// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";

// // Example of default export
// export default async function proxy(req: NextRequest) {
//   const pathName = req.nextUrl.pathname;

//   const isAuth = pathName === "/login" || pathName === "/register";

//   const token = await getToken({
//     req,
//     secret: process.env.AUTH_SECRET,
//   });
//   //! console.log(token);

//   if (isAuth) {
//     if (token) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }
//     return NextResponse.next();
//   }

//   if (token) {
//     return NextResponse.next();
//   }
//   return NextResponse.redirect(new URL("/login", req.url));

//   // Proxy logic
// }
// export const config = {
//   matcher: ["/cart", "/shop", "/wishlist","/allorders","/Profile","/orders","/contact", "/brands","/login","/register","/payment"],
// };
