"use server";
import { LoginResponseType } from "../login/login.interface";
import { RigesterDataType } from "./register.interface";

export async function handleUserRegister(userData: RigesterDataType) {
    console.log("USER DATA:", userData);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signup`,

    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    },
  );

  const data:LoginResponseType = await res.json();
  console.log(data);
  console.log(JSON.stringify(data, null, 2));
  return "hello hamada";
}
