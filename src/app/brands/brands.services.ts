import { AllBrandsResponse, BrandDaum } from "./brands.interface";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 🟢 1. جلب جميع الماركات (يرجع مصفوفة الماركات BrandDaum[])
export async function getAllBrands(): Promise<BrandDaum[]> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/brands`);
    if (!res.ok) return [];
    
    const data: AllBrandsResponse = await res.json();
    return data.data; // ترجع مصفوفة البراندات
  } catch (error) {
    console.error("Error fetching brands:", error);
    return [];
  }
}

// 🟢 2. جلب براند محدد بالـ ID
export async function getSingleBrand(id: string): Promise<BrandDaum | null> {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/brands/${id}`);
    if (!res.ok) return null;
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching single brand:", error);
    return null;
  }
}

// 🟢 3. جلب منتجات براند محدد
export async function getProductsByBrand(brandId: string) {
  try {
    const res = await fetch(`${BASE_URL}/api/v1/products?brand=${brandId}`);
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching products by brand:", error);
    return [];
  }
}