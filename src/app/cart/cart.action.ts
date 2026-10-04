"use server";
import { UserCartType } from "@/components/AddToCart/addToCard.interface";
import { getUserToken } from "../myUtil";
import { revalidatePath } from "next/cache";

export async function handleUpdateProductCount(productId: string, count: number):Promise<UserCartType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
        method: "PUT",
        headers: {
          token: (await getUserToken()) as string,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ count }),
    },
  );
  const data = await res.json();  
  revalidatePath("/cart");
  return data;
}



export async function handleRemoveProduct(productId: string):Promise<UserCartType> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${productId}`,
    {
        method: "DELETE",
        headers: {
          token: (await getUserToken()) as string,
          "Content-Type": "application/json",
        },
        
    },
  );
  const data = await res.json();  
  console.log(data);
  
  revalidatePath("/cart");
  return data;
}
