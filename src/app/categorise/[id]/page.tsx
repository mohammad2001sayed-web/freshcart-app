// app/categorise/[id]/page.tsx

import Image from "next/image";
import { getSingleCategory, getProductsByCategory } from "../category.services";
import AddToCart from "@/components/AddToCart/AddToCart";
import { Eye,  RefreshCw, Star } from "lucide-react";
import Link from "next/link";
import WishlistButton from "@/components/WishlistButton/WishlistButton";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function SingleCategoryPage({ params }: PageProps) {
  const { id } = await params;

  const [category, products] = await Promise.all([
    getSingleCategory(id),
    getProductsByCategory(id),
  ]);

  return (
    <>
    <div className="bg-main-color border border-emerald-100 p-6 mb-8 ">
      <div className="text-white flex items-center gap-2 mb-4 text-sm">
        <Link href="/">Home</Link><span>/</span>
        <Link href="/categorise">Back to Categories</Link>
      </div>

      <div className="flex items-center">
        {category?.image && (
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-white shadow-sm">
            <Image
              src={category.image}
              alt={category?.name || "Category"}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {category?.name || "التصنيف"}
          </h1>
          <p className="text-sm text-emerald-700 font-medium mt-1">
            عدد المنتجات المتاحة: {products?.length || 0}
          </p>
        </div>
      </div>
    </div>
    <main className="p-6 max-w-7xl mx-auto min-h-screen">
      {/* 🔹 هيدر التصنيف */}

      {/* 🔹 شبكة عرض المنتجات */}
      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <div
              key={product._id || product.id}
              className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-3 justify-between group"
            >
              <div>
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-50">
                  <Image
                    src={product.imageCover || product.images?.[0]}
                    alt={product.title || "Product"}
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 flex flex-col items-center gap-4">
                    <WishlistButton  productId={product._id}/>
                    <RefreshCw size={14} />

                    <Link href={`/productDeteles/${product._id || product.id}`}>
                    <Eye size={14} />
                    </Link>

                  </div>
                </div>
                <span className="text-xs font-medium py-1 ">
                  {product.category?.name || category?.name}
                </span>
                <h3 className="font-semibold text-gray-800 text-sm mt-2 line-clamp-2">
                  {product.title}
                </h3>
              </div>
              <div className="flex justify-start items-center">
                {Array.from({ length: Math.floor(product.ratingsAverage) }).map(
                  (e, i) => (
                    <Star key={i} className="text-yellow-400 fill-[#FDC700]" />
                  ),
                )}
                {Array.from({
                  length: 5 - Math.floor(product.ratingsAverage),
                }).map((e, i) => (
                  <Star key={i} className="text-yellow-400 " />
                ))}

                <span className="text-xs text-gray-500 font-semibold ms-2 flex items-center gap-1">
                  ★ {product.ratingsAverage} ({product.ratingsQuantity})
                </span>
              </div>

              <h3 className="text-md flex items-center justify-start gap-2">
                <span>Price:</span>

                {product.priceAfterDiscount ? (
                  <>
                    <span className="text-gray-400 line-through">
                      {product.price}
                    </span>

                    <span className="text-main-color font-semibold">
                      {product.priceAfterDiscount}
                    </span>
                  </>
                ) : (
                  <span>{product.price}</span>
                )}
              </h3>
              <div className="flex items-end justify-end rounded-full gap-2 ">

              <AddToCart  productId={product._id} />
              </div>

            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-gray-500 text-lg font-medium">
            لا توجد منتجات متوفرة حالياً في هذا التصنيف.
          </p>
        </div>
      )}
    </main>
  </>
  );
}
