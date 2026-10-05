"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { PaymentDataType } from "./Payment.interface";
import { auth } from "../../../auth";

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

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}`,
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







// "use server";
// import { revalidatePath } from "next/cache";
// import { getUserToken } from "../myUtil";
// import { PaymentDataType } from "./Payment.interface";

// export async function handleCreateOrder(shippingAddress:PaymentDataType , cartId:string) {
//     const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v2/orders/${cartId}`,
//          {method:"POST",
//             headers:{
//                 token:(await getUserToken()) as string,
//                 "Content-Type": "application/json",

//             }
//             ,body:JSON.stringify({shippingAddress})

//     })

//     const data = await res.json();
//     revalidatePath("/cart");
//     console.log("Create Order",data);
//     return data

// }
