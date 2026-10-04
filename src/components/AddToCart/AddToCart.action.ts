"use server";

import { getUserToken } from "@/app/myUtil";
import { UserCartType } from "./addToCard.interface";
import { revalidatePath } from "next/cache";

export async function addProductUserToCart(productId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "POST",
    headers: {
      token: (await getUserToken()) as string,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });
  const {
    message,
    numOfCartItems,
    cartId,
    data: { products, totalCartPrice },
  } = await res.json();
  revalidatePath("/cart");
  return { message, numOfCartItems, cartId, products, totalCartPrice };

  // getUserToken()
}
export async function getUserCart(): Promise<UserCartType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "GET",
    headers: {
      token: (await getUserToken()) as string,
    },
    cache: "no-cache", 
  });
  const data: UserCartType = await res.json();
  return data;

  // getUserToken()
}
