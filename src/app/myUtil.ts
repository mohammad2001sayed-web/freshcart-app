import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
  const cookie = await cookies();
  const session_token = cookie.get("authjs.session-token")?.value;

 const token = await decode({
    token: session_token,
    secret: process.env.AUTH_SECRET || "",
    salt: "authjs.session-token",
  });
  // console.log( token?.credantialsToken);

  return token?.credantialsToken;
  
}
