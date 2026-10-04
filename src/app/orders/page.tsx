
// 🔹 يمنع Next.js إنه يعتبر الصفحة دي "static" ويكاشها —

import { auth } from "../../../auth";
import { handleGetUserOrders } from "./Orders.action";
import OrdersClient from "./OrdersClient/OrdersClient";

// كل زيارة بتجيب أحدث بيانات من السيرفر فعليًا
export const dynamic = "force-dynamic";

export default async function page() {
  const session = await auth();

  const orders = session?.user?._id
    ? await handleGetUserOrders(session.user._id)
    : [];

  return <OrdersClient orders={orders} />;
}