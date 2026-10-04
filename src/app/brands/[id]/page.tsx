// app/brands/[id]/page.tsx

import Image from "next/image";
import ProductCard from "@/components/ProductCard/ProductCard"; // مكون ProductCard الخاص بك
import { getProductsByBrand, getSingleBrand } from "../brands.services";
import Link from "next/link";
import { Funnel, Layers, Tags, X } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleBrandPage({ params }: PageProps) {
  const { id } = await params;

  const [brand, products] = await Promise.all([
    getSingleBrand(id),
    getProductsByBrand(id),
  ]);

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
            <Link href="/brands" className="hover:text-white transition-colors">
              Brands
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">{brand?.name}</span>
          </nav>

          {/* Title Header */}
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Image
                src={brand!.image}
                alt={brand?.name || "Brand"}
                fill
                className="object-contain p-3"
              />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Top Brands
              </h1>
              <p className="text-sm text-emerald-100 font-light mt-1">
                Shop from your favorite brands
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container my-10 min-h-screen">
        {/* 🔹 هيدر البراند أنيق وبنفس التناسق */}
        <div className="flex items-center justify-between bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm mb-10">
          <div className="flex items-center gap-4">
            <Funnel size={16} fill="#000" /> <span>Active Filters:</span>{" "}
            <Link
              className="flex items-center gap-2 bg-[#EDE9FE] text-sm px-4 py-1 text-[#7008E7] hover:bg-violet-200 transition-colors font-semibold rounded-3xl "
              href="/shope"
            >
              {" "}
              <Tags size={15} />
              {brand?.name}
              <X size={15} />
            </Link>{" "}
            <Link
              className="flex items-center gap-2 underline text-sm  text-gray-500 font-semibold hover:text-black transition-colors"
              href="/shope"
            >
              Clear all
            </Link>
          </div>
        </div>

        {/* 🔹 منتجات البراند بمسافات ممتازة ومطابقة لصفحة Home */}
        {products && products.length > 0 ? (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product: any) => (
              <ProductCard key={product._id} prod={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500 text-lg font-medium">
              No products available for {brand?.name || "this brand"} at the
              moment.
            </p>
            x
          </div>
        )}
      </main>
    </>
  );
}
