"use server";

import { auth } from "../../../auth";


export interface OrderProductType {
  _id: string;
  title: string;
  imageCover: string;
  category?: { name: string };
}

export interface OrderItemType {
  _id: string;
  count: number;
  price: number;
  product: OrderProductType;
}

export interface ShippingAddressType {
  details: string;
  phone: string;
  city: string;
}

export interface OrderType {
  _id: string;
  id: number;
  cartItems: OrderItemType[];
  shippingAddress: ShippingAddressType;
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
  isPaid: boolean;
  isDelivered: boolean;
  paymentMethodType: "cash" | "card";
  createdAt: string;
}

export async function handleGetUserOrders(
  userId: string,
): Promise<OrderType[]> {
  const session = await auth();
  console.log("--> Session User ID:", userId);
  console.log("--> Session Token:", session?.user?.tkn);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`,
    {
      method: "GET",
      headers: {
        token: session?.user?.tkn as string,
      },
      cache: "no-store",
    },
  );

  if (!res.ok) return [];

  const data = await res.json();

  // ⚠️ الـ endpoint ده بيرجّع array مباشرة مش {data: [...]} — بنتعامل مع الحالتين
  return Array.isArray(data) ? data : data?.data || [];
}