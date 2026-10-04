// في ملف app/allorders/page.tsx
import { redirect } from "next/navigation";

export default function AllOrders() {
  redirect("/orders");
}