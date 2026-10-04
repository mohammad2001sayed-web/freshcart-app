import { productDetelesResponse, productDetelesType } from "./productDeteles.interface";

// 1. دالة جلب بيانات المنتج الفردي
export async function getSingleProduct(id: string): Promise<productDetelesType> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`);
  const data: productDetelesResponse = await res.json();
  return data.data;
}

// 2. دالة جلب المنتجات ذات الصلة (حسب الـ category)
export async function getRelatedProducts(categoryId?: string): Promise<productDetelesType[]> {
  if (!categoryId) return [];

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?category=${categoryId}`
  );
  const data = await res.json();
  return data.data || [];
}