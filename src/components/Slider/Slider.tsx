"use client";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-fade";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Link from "next/link";

type SlideContent = {
  h3: string;
  p: string;
  btn1: string;
  btn2: string;
  link1: string;
  link2: string;

  h3Class?: string;
  pClass?: string;
  btn1Class?: string;
  btn2Class?: string;
};

export default function Slider({
  overlay,
  contant,
  imageList,
  autoplay = false,
  navigation,
  effect = "fade",
  spaceBetween = 100,
  slidesPerView = 1,
  pagination = false,
}: {
  overlay?: boolean;
  contant?: SlideContent[];
  imageList: string[];
  spaceBetween?: number;
  slidesPerView?: number;
  pagination?: boolean;
  effect?: string;
  navigation?: boolean;
  autoplay: boolean | { delay: number; disableOnInteraction: boolean };
}) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      navigation={navigation}
      loop
      effect={effect}
      /* التعديل هنا: إضافة clickable لتمكين الضغط على النقاط */
      pagination={pagination ? { clickable: true } : false}
      autoplay={
        autoplay === false
          ? false
          : typeof autoplay === "object"
            ? autoplay
            : { delay: 3000, disableOnInteraction: false }
      }
      className="h-96"
    >
      {imageList.map((e, i) => (
        <SwiperSlide key={i} className="relative">
          <Image src={e} fill alt="" className="object-cover" />

          {/* التعديل هنا: إضافة pointer-events-none حتى لا تحجب الطبقة الخضراء النقر عن النقاط والأسهم */}
          {overlay && (
            <div className="absolute inset-0 bg-green-500/50 z-10 pointer-events-none" />
          )}

          {contant?.[i] && (
            <div className="bg-linear-to-r from-green-600 via-green-500/60 to-transparent absolute inset-0 z-20 flex flex-col justify-center items-start px-12 md:px-20 text-white gap-3 max-w-xl">
              {/* العنوان */}
              <h2
                className={`text-3xl! md:text-5xl font-extrabold  leading-tight ${
                  contant[i].h3Class || ""
                } ${
                  i === 0 ? "opacity-0 animate-fade-up delay-100" : ""
                }`}
              >
                {contant[i].h3}
              </h2>

              {/* الوصف */}
              <p
                className={`text-base! text-white md:text-lg opacity-90 ${
                  contant[i].pClass || ""
                } ${
                  i === 0 ? "opacity-0 animate-fade-up delay-200" : ""
                }`}
              >
                {contant[i].p}
              </p>

              {/* الأزرار */}
              <div
                className={`flex gap-3 mt-2 ${
                  i === 0 ? "opacity-0 animate-fade-up delay-300" : ""
                }`}
              >
                <Link
                  href={contant[i].link1}
                  className={`bg-white flex items-center justify-center font-semibold px-6 py-2.5 rounded-xl hover:bg-gray-100 transition-all shadow ${
                    contant[i].btn1Class || ""
                  }`}
                >
                  {contant[i].btn1}
                </Link>

                <Link
                  href={contant[i].link2}
                  className={`border-2 border-white/80 text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-white/20 transition-all ${
                    contant[i].btn2Class || ""
                  }`}
                >
                  {contant[i].btn2}
                </Link>
              </div>
            </div>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
}