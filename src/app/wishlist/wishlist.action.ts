"use server";

import { getUserToken } from "../myUtil"; // أو المكان الصحيح لـ myUtil عندك
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// 1️⃣ جلب قائمة المنتجات المفضلة (GET Wishlist)
export async function getWishlist() {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "fail", message: "User not authenticated", data: [] };
    }

    const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
      method: "GET",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!res.ok) {
      return { status: "fail", message: "Failed to fetch wishlist", data: [] };
    }

    const data = await res.json();
    return data; // بيرجع { status: "success", count: 1, data: [...] }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    return { status: "error", message: "Internal server error", data: [] };
  }
}

// 2️⃣ إضافة منتج للمفضلة (POST Wishlist)
export async function addProductToWishlist(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "fail", message: "برجاء تسجيل الدخول أولاً" };
    }

    const res = await fetch(`${BASE_URL}/api/v1/wishlist`, {
      method: "POST",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const data = await res.json();

    if (res.ok) {
      revalidatePath("/wishlist");
    }

    return data;
  } catch (error) {
    console.error("Error adding to wishlist:", error);
    return { status: "error", message: "حدث خطأ في السيرفر" };
  }
}

// 3️⃣ حذف منتج من المفضلة (DELETE Wishlist)
export async function removeProductFromWishlist(productId: string) {
  try {
    const token = await getUserToken();
    if (!token) {
      return { status: "fail", message: "برجاء تسجيل الدخول أولاً" };
    }

    const res = await fetch(`${BASE_URL}/api/v1/wishlist/${productId}`, {
      method: "DELETE",
      headers: {
        token: token as string,
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();

    if (res.ok) {
      revalidatePath("/wishlist");
    }

    return data;
  } catch (error) {
    console.error("Error removing from wishlist:", error);
    return { status: "error", message: "حدث خطأ في السيرفر" };
  }
}