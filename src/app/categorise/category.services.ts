import { CategoryeDataType, CategoryeResponse } from "./categorise.interface";

export async function getAllCategories(): Promise<CategoryeDataType[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`,
    {
      signal: AbortSignal.timeout(15000), // 15s
      cache: "no-store",
    }
  );

  if (!res.ok) {
    console.error("getAllCategories failed:", res.status, res.statusText);
    return [];
  }

  const data: CategoryeResponse = await res.json();
  return data.data;
}

// app/categorise/category.services.ts

// 1️⃣ جلب بيانات تصنيف محدد
export async function getSingleCategory(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}`,
    { signal: AbortSignal.timeout(15000) }
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.data;
}

// 2️⃣ جلب المنتجات التابعة لتصنيف معين
export async function getProductsByCategory(categoryId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=${categoryId}`,
    {
      cache: "no-store", // يُلزم السيرفر بجلب أحدث البيانات مع كل طلب
      signal: AbortSignal.timeout(15000),
    }
  );
  if (!res.ok) return [];
  const data = await res.json();
  return data.data;
}