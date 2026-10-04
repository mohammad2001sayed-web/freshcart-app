import Link from 'next/link';
import Image from 'next/image';
import { getAllCategories } from '@/app/categorise/category.services';

export default async function ShopByCategory() {
  const categoriesList = await getAllCategories();

  return (
    <section className="py-8 px-4 max-w-7xl mx-auto">
      {/* Header القسم */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          {/* الخط الأخضر الرأسي */}
          <span className="w-1.5 h-7 bg-emerald-600 rounded-full inline-block"></span>
          <h2 className="text-2xl font-bold text-gray-900">
            Shop By <span className="text-emerald-600">Category</span>
          </h2>
        </div>

        {/* رابط مشاهدة الكل */}
        <Link
          href="/categorise"
          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm flex items-center gap-1 transition-colors"
        >
          View All Categories
          <span className="text-lg">→</span>
        </Link>
      </div>

      {/* Grid الكروت المتجاوب */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categoriesList?.map((category) => (
          <Link
            key={category._id}
            href={`/categorise/${category._id}`} // 👈 التوجيه لصفحة التصنيف
            className="flex flex-col items-center justify-center p-4 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          >
            {/* الصورة الدائرية */}
            <div className="relative w-20 h-20 mb-3 rounded-full overflow-hidden bg-gray-50 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>

            {/* اسم التصنيف */}
            <h3 className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors text-center truncate w-full">
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}