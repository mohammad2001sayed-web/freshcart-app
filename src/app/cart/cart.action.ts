"use server";
import { UserCartType } from "@/components/AddToCart/addToCard.interface";
import { revalidatePath } from "next/cache";
import { auth } from "../../../auth";

function emptyCart(message: string): UserCartType {
  return {
    status: "error",
    message,
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

export async function handleUpdateProductCount(
  productId: string,
  count: number,
): Promise<UserCartType> {
  const session = await auth();
  const token = session?.user?.tkn;

  if (!token) {
    return emptyCart("You must be logged in to update your cart.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
      method: "PUT",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ count }),
    },
  );
  const data = await res.json();

  if (!res.ok || !data?.data) {
    return emptyCart(data?.message || "Could not update item count.");
  }

  revalidatePath("/cart");
  return data;
}

export async function handleRemoveProduct(
  productId: string,
): Promise<UserCartType> {
  const session = await auth();
  const token = session?.user?.tkn;

  if (!token) {
    return emptyCart("You must be logged in to update your cart.");
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
      method: "DELETE",
      headers: {
        token,
        "Content-Type": "application/json",
      },
    },
  );
  const data = await res.json();

  if (!res.ok || !data?.data) {
    return emptyCart(data?.message || "Could not remove item.");
  }

  revalidatePath("/cart");
  return data;
}