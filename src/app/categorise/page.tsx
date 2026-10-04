
import Link from "next/link";
import Image from "next/image";
import { Layers, ArrowRight } from "lucide-react";
import { getAllCategories } from "./category.services";


export const dynamic = "force-dynamic";
export default async function CategoriesPage() {
  const categoriesList = await getAllCategories();

  return (
    <main className="min-h-screen bg-gray-50/50 pb-16">
      {/* 🟢 1. Green Hero Banner */}
      <div className="bg-main-color text-white py-10 px-4 sm:px-8 md:px-12 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-xs text-emerald-100 mb-4 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Categories</span>
          </nav>

          {/* Title Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Layers fill="#fff" size={28} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                All Categories
              </h1>
              <p className="text-sm text-emerald-100 font-light mt-1">
                Browse our wide range of product categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 🟢 2. Categories Grid (5 الكروت في السطر للشاشات الكبيرة كما في الصورة) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {categoriesList && categoriesList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categoriesList.map((category: any) => (
              <Link
                key={category._id || category.id}
                href={`/categorise/${category._id || category.id}`}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-between group cursor-pointer"
              >
                {/* صورة التصنيف */}
                <div className="relative w-full h-48 mb-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                  />
                </div>

                {/* اسم التصنيف ورابط الفرعيات */}
                <div className="text-center w-full min-h-10.5 flex flex-col justify-center items-center">
                  <h3 className="text-sm font-bold text-gray-800 group-hover:text-emerald-600 transition-colors truncate w-full">
                    {category.name}
                  </h3>
                  
                  {/* تظهر فقط عند الـ Hover على الكارت */}
                  <span className="text-[11px] font-medium text-emerald-600 mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Subcategories <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        )}
      </div>
    </main>
  );
}