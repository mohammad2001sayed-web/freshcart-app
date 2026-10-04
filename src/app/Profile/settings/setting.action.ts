"use server";

import { auth } from "../../../../auth";
import { ActionResponse, ChangePasswordDataType, UpdateProfileDataType } from "./setting.interface";



// 👈 عدّل المسار حسب مكان export const { auth, ... } = NextAuth(authJsConfing) عندك


async function getBackendToken() {
  const session = await auth();
  return session?.user?.tkn;
}

// 🔹 Update profile info (name / email / phone)
export async function handleUpdateProfile(
  data: UpdateProfileDataType,
): Promise<ActionResponse> {
  const token = await getBackendToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/updateMe/`,
    {
      method: "PUT",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return res.json();
}

// 🔹 Change password
export async function handleChangePassword(
  data: ChangePasswordDataType,
): Promise<ActionResponse> {
  const token = await getBackendToken();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  return res.json();
}