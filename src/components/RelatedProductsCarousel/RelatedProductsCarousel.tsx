"use client";

import { Children, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProductsCarousel({
  children,
}: {
  children: ReactNode;
}) {
  const items = Children.toArray(children);

  if (items.length === 0) return null;

  return (
    <section className="mt-12 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-6 bg-emerald-600 rounded-full inline-block"></span>
          <h2 className="text-xl font-bold text-gray-900">
            You May Also Like
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            id="related-prev"
            className="p-2 rounded-lg bg-gray-100 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            id="related-next"
            className="p-2 rounded-lg bg-gray-100 hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: "#related-prev",
          nextEl: "#related-next",
        }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 5 },
        }}
        className="w-full"
      >
        {items.map((child, idx) => (
          <SwiperSlide key={idx} className="h-auto">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}