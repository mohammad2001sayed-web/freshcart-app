"use server";

import { auth } from "../../../auth";
import { UserCartType } from "./addToCard.interface";
import { revalidatePath } from "next/cache";

function emptyCart(): UserCartType {
  return {
    status: "success",
    message: "empty cart",
    numOfCartItems: 0,
    cartId: "",
    data: {
      _id: "",
      cartOwner: "",
      products: [],
      createdAt: "",
      updatedAt: "",
      __v: 0,
      totalCartPrice: 0,
    },
  };
}

export async function addProductUserToCart(productId: string) {
  const session = await auth();
  const token = session?.user?.tkn;

  if (!token) {
    return {
      message: "You must be logged in to add items to the cart.",
      numOfCartItems: 0,
      cartId: null,
      products: [],
      totalCartPrice: 0,
    };
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "POST",
    headers: {
      token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId }),
  });

  const result = await res.json();

  // Defensive: the API may not return a `data` object on error (bad token,
  // validation error, etc). Destructuring that case directly used to crash
  // the Server Component with "Minified React error #441".
  if (!res.ok || !result?.data) {
    return {
      message: result?.message || "Something went wrong adding this item.",
      numOfCartItems: result?.numOfCartItems ?? 0,
      cartId: result?.cartId ?? null,
      products: [],
      totalCartPrice: 0,
    };
  }

  const { message, numOfCartItems, cartId, data } = result;
  revalidatePath("/cart");
  return {
    message,
    numOfCartItems,
    cartId,
    products: data.products,
    totalCartPrice: data.totalCartPrice,
  };
}

export async function getUserCart(): Promise<UserCartType> {
  const session = await auth();
  const token = session?.user?.tkn;

  if (!token) {
    // Not logged in / no valid session token: return an empty-cart shape
    // instead of letting the API call fail and crash the page.
    return emptyCart();
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "GET",
    headers: {
      token,
    },
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok || !data?.data) {
    // e.g. token expired/invalid, or user has no cart yet.
    return emptyCart();
  }

  return data as UserCartType;
}