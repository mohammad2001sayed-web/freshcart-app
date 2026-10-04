"use server";

import { cookies } from "next/headers";
import { LoginDataType, LoginResponseType } from "./login.interface";

export async function handleUserLogin(userData: LoginDataType) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );
  const data: LoginResponseType = await res.json();

  if (data.message === "success") {
    const cookieStore = await cookies();
    cookieStore.set("token", data.token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 5,
      sameSite: "strict",
    });

    return "Login successful";
  }
  return data.message;
}
