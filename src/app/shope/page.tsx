import ProductCard from "@/components/ProductCard/ProductCard";
import { getAllProducts } from "../home.services"; // عدل مسار home.services حسب موقع الملف عندك
import Link from "next/link";
import { Layers } from "lucide-react";


export const dynamic = "force-dynamic";
export default async function ShopPage() {
  const productList = await getAllProducts();

  return (
    <>
          <div className="bg-main-color text-white py-10 px-4 sm:px-8 md:px-12 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-xs text-emerald-100 mb-4 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">All Products</span>
          </nav>

          {/* Title Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Layers fill="#fff" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                All Products
              </h1>
              <p className="text-sm text-emerald-100 font-light mt-1">
                Browse our wide range of product Products
              </p>
            </div>
          </div>
        </div>
      </div>

    <div className="container my-10">
      {/* 🔹 Header العنوان */}
   
<div className="text-gray-500 text-[14px] font-medium mb-6">
  Showing {productList.length} products
</div>
      {/* 🔹 شبكة عرض المنتجات بمكونك الخاص ProductCard */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
        {productList?.map((product: any) => (
          <ProductCard key={product._id} prod={product} />
        ))}
      </div>
    </div>
    </>
  );
}