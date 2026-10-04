"use server";

import { getUserToken } from "../myUtil";
import { AddressDataType, AddressesResponse, SingleAddressResponse } from "./profile.interface";



// 🔹 Get all saved addresses for the logged-in user
export async function handleGetAddresses(): Promise<AddressesResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses`,
    {
      method: "GET",
      headers: {
        token: (await getUserToken()) as string,
      },
      cache: "no-store",
    },
  );

  const data = await res.json();
  return data;
}

// 🔹 Add a new address
export async function handleAddAddress(
  address: AddressDataType,
): Promise<SingleAddressResponse> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses`,
    {
      method: "POST",
      headers: {
        token: (await getUserToken()) as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    },
  );

  const data = await res.json();
  return data;
}

// 🔹 Update an existing address
// ⚠️ ملاحظة مهمة: الـ API ده (routemisr) مش موثّق إن عنده PUT للـ addresses،
// بس بنجرب الأول، ولو رجع خطأ (404 / مش status success) بنعمل Fallback:
// نمسح العنوان القديم ونضيف واحد جديد بنفس البيانات المعدّلة.
export async function handleUpdateAddress(
  addressId: string,
  address: AddressDataType,
): Promise<SingleAddressResponse & { usedFallback?: boolean }> {
  const token = (await getUserToken()) as string;

  // المحاولة الأولى: PUT مباشر
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses/${addressId}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    },
  );

  // لو الـ PUT اشتغل فعلاً (status 2xx و status: success)
  if (res.ok) {
    const data = await res.json();
    if (data?.status === "success" || data?.data) {
      return data;
    }
  }

  // 🔁 Fallback: مفيش PUT متاح -> نمسح القديم ونضيف الجديد بدله
  await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: { token },
    },
  );

  const createRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    },
  );

  const createData = await createRes.json();
  return { ...createData, usedFallback: true };
}

// 🔹 Remove an address by id
export async function handleRemoveAddress(
  addressId: string,
): Promise<{ status: string; message?: string }> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/addresses/${addressId}`,
    {
      method: "DELETE",
      headers: {
        token: (await getUserToken()) as string,
      },
    },
  );

  const data = await res.json();
  return data;
}