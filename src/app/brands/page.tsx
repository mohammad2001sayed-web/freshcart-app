import { ArrowRight, Layers, Tag } from "lucide-react";
import Link from "next/link";
import { getAllBrands } from "./brands.services";
import Image from "next/image";

export default async function page() {
   const brands = await getAllBrands();

  return (
    <>
      <div className="bg-[#8B4AFF] text-white py-10 px-4 sm:px-8 md:px-12 mb-10 shadow-sm">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumbs */}
          <nav className="text-xs text-emerald-100 mb-4 flex items-center gap-2 font-medium">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-white font-semibold">Brands</span>
          </nav>

          {/* Title Header */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
            
              <Tag   size={28} className="text-white" />
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

      
      {/* 🔹 2. Brands Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {brands && brands.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {brands.map((brand) => (
              <Link
                key={brand._id}
                href={`/brands/${brand._id}`}
                className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-500 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center group cursor-pointer"
              >
                {/* صورة البراند */}
                <div className="relative w-full h-28 mb-2 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                    sizes="120px"
                  />
                </div>
                {/* اسم البراند */}
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-violet-600 transition-colors text-center truncate w-full">
                  {brand.name}

                </h3>
                  <span className="text-[11px] font-medium text-violet-600 mt-1 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    View Products <ArrowRight size={12} />
                  </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm">
            <p className="text-gray-500 text-lg font-medium">
              No brands found.
            </p>
          </div>
        )}
      </div>
    </>



  );
}
