// app/productDeteles/[id]/page.tsx

import { getWishlist } from "@/app/wishlist/wishlist.action";
import {
  getRelatedProducts,
  getSingleProduct,
} from "./productDeteles.services";
import ProductDetailsClient from "./ProductDetailsClient";
import ProductCard from "@/components/ProductCard/ProductCard";
import RelatedProductsCarousel from "@/components/RelatedProductsCarousel/RelatedProductsCarousel";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 1. جلب بيانات المنتج الرئيسي
  const product = await getSingleProduct(id);

  // 2. جلب المفضلة والمنتجات ذات الصلة بالتوازي
  const [wishlistRes, relatedProducts] = await Promise.all([
    getWishlist(),
    getRelatedProducts(product?.category?._id),
  ]);

  // 3. تحديد حالة المفضلة
  const wishlistIds = new Set(
    wishlistRes?.data?.map((item: any) => item._id || item.id) || [],
  );
  const initialInWishlist = wishlistIds.has(id);

  // 4. تصفية المنتجات ذات الصلة لاستبعاد المنتج الحالي
  const filteredRelatedProducts =
    relatedProducts?.filter(
      (item: any) => item && (item._id || item.id) !== id,
    ) || [];

  return (
    <main className="container my-10 min-h-screen">
      <ProductDetailsClient
        product={product}
        initialInWishlist={initialInWishlist}
      />

      {/* 🔹 ProductCard بيترندر هنا (Server Component)، وبيتبعت كـ children
          لـ RelatedProductsCarousel (Client Component) اللي مسؤول بس عن
          الـ Swiper التفاعلي. كده ProductCard يفضل async Server Component صح. */}
      <RelatedProductsCarousel>
        {filteredRelatedProducts.map((item: any) => (
          <ProductCard key={item._id || item.id} prod={item} />
        ))}
      </RelatedProductsCarousel>
    </main>
  );
}