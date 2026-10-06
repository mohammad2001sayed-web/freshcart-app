"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { PaymentDataType } from "./Payment.interface";
import { auth } from "../../../auth";

// 🔹 بيجيب الدومين الحالي الفعلي (محليًا أو على Vercel) بدل ما يفضل
// متسجل على localhost. الـ API محتاج "url" ده عشان يعرف يرجّع المستخدم
// فين بعد ما يخلّص الدفع على Stripe.
async function getCurrentOrigin() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = host?.includes("localhost") ? "http" : "https";
  return `${protocol}://${host}`;
}

export async function handleCreateCashOrder(
  shippingAddress: PaymentDataType,
  cartId: string,
) {
  const session = await auth();
  const token = session?.user?.tkn;

  if (!token) {
    return {
      message: "You must be logged in to place an order.",
    };
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/orders/${cartId}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    },
  );

  const data = await res.json();

  console.log("Cash Order:", data);

  // لو الأوردر فشل، منعملش redirect خالص ونسيب الـ client يتعامل مع الخطأ
  if (!res.ok) {
    return data;
  }

  revalidatePath("/cart");
  revalidatePath("/orders");

  // 🔹 الـ redirect بيحصل هنا جوه نفس الـ Server Action، فورًا بعد الـ revalidate.
  // ده بيضمن إن صفحة /orders تتجاب "fresh" من السيرفر، من غير ما يعتمد على
  // الـ Router Cache بتاع المتصفح (اللي كان بيفضل عارض النسخة القديمة)
  redirect("/orders");
}

export async function handleCreateOnlineOrder(
  shippingAddress: PaymentDataType,
  cartId: string,
) {
  const session = await auth();
  const token = session?.user?.tkn;

  if (!token) {
    return {
      message: "You must be logged in to place an order.",
    };
  }

  const origin = await getCurrentOrigin();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${origin}`,
    {
      method: "POST",
      headers: {
        token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        shippingAddress,
      }),
    },
  );

  const data = await res.json();

  console.log("Online Order:", data);

  return data;
}