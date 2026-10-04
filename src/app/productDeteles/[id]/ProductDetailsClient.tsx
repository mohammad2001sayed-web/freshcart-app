"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Zap,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Star,
  CheckCircle2,
  BriefcaseBusiness,
  Van,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import AddToCart from "@/components/AddToCart/AddToCart";
import WishlistButton from "@/components/WishlistButton/WishlistButton";
import ProductCard from "../../../components/ProductCard/ProductCard";
import { Product } from "@/app/home.interface";
import { productDetelesType } from "./productDeteles.interface";

// Swiper Imports
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

// Swiper Styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/autoplay";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// 🔹 دعم التوافقية بين أنواع المنتجات المختلفه في التطبيق
type SingleProductType = Product | productDetelesType | any;

interface ProductDetailsProps {
  product: SingleProductType;
  initialInWishlist?: boolean;
  relatedProducts?: SingleProductType[];
}

export default function ProductDetailsClient({
  product,
  initialInWishlist = false,
  relatedProducts = [],
}: ProductDetailsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const {
    _id,
    id,
    title,
    description,
    imageCover,
    images = [],
    brand,
    price,
    priceAfterDiscount,
    quantity,
    category,
    ratingsAverage = 4.5,
    ratingsQuantity = 12,
  } = product || {};

  const productId = _id || id;
  const allImages = [
    imageCover,
    ...images.filter((img: string) => img !== imageCover),
  ].filter(Boolean);

  const [mainSwiper, setMainSwiper] = useState<SwiperType | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [selectedQty, setSelectedQty] = useState<number>(1);

  const totalPrice = (price ? price * selectedQty : 0).toFixed(2);

  const handleThumbClick = (index: number) => {
    setActiveIndex(index);
    if (mainSwiper && !mainSwiper.destroyed) {
      mainSwiper.slideTo(index);
    }
  };

  if (!isMounted) {
    return <div className="w-full min-h-100" />;
  }

  return (
    <div className="w-full">
      <style jsx global>{`
        .thumbs-swiper .active-thumb {
          border-color: #059669 !important;
          opacity: 1 !important;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.25) !important;
          transform: scale(1.03);
        }
      `}</style>

      {/* 🔹 Breadcrumbs */}
      <nav className="text-xs text-gray-500 mb-6 flex items-center gap-2 font-medium">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href="/shope"
          className="hover:text-emerald-600 transition-colors"
        >
          {category?.name || "Category"}
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-semibold truncate max-w-xs md:max-w-md">
          {title}
        </span>
      </nav>

      {/* 🔹 Main Product Details Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm mb-12">
        {/* 📷 Left Column: Image Gallery */}
        <div className="lg:col-span-5 flex flex-col items-center w-full min-w-0">
          <div className="w-full relative rounded-2xl bg-gray-50/60 border border-gray-100 overflow-hidden p-2">
            <Swiper
              onSwiper={setMainSwiper}
              initialSlide={activeIndex}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
                if (thumbsSwiper && !thumbsSwiper.destroyed) {
                  thumbsSwiper.slideTo(swiper.activeIndex);
                }
              }}
              spaceBetween={10}
              grabCursor={true}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              className="w-full h-90 md:h-105 rounded-xl main-product-swiper"
            >
              {allImages.map((img: string, idx: number) => (
                <SwiperSlide
                  key={idx}
                  className="relative w-full h-full flex items-center justify-center p-2 select-none"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={img}
                      alt={`${title || "Product"} - ${idx + 1}`}
                      fill
                      className="object-contain p-4 pointer-events-none"
                      priority={idx === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* 🔹 Thumbnail Carousel */}
          {allImages.length > 1 && (
            <div className="w-full mt-4 px-1 max-w-85">
              <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={3}
                centeredSlides={true}
                freeMode={true}
                watchSlidesProgress={true}
                slideToClickedSlide={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="w-full thumbs-swiper py-1"
              >
                {allImages.map((img: string, idx: number) => (
                  <SwiperSlide
                    key={idx}
                    className="cursor-pointer"
                    onClick={() => handleThumbClick(idx)}
                  >
                    <div
                      className={`relative w-full h-30 rounded-xl border-2 overflow-hidden bg-gray-50 p-1 transition-all duration-200 hover:border-[#337AB7] ${
                        activeIndex === idx
                          ? "active-thumb border-[#337AB7]!"
                          : "border-gray-200"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-contain p-1 pointer-events-none"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/* 📝 Right Column: Product Details & Actions */}
        <div className="lg:col-span-7 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              {category?.name && (
                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-semibold">
                  {category.name}
                </span>
              )}
              {brand?.name && (
                <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                  {brand.name}
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-snug mb-3">
              {title}
            </h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < Math.floor(ratingsAverage)
                        ? "fill-amber-400 text-amber-400"
                        : "text-gray-300"
                    }
                  />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-700">
                {ratingsAverage}
              </span>
              <span className="text-xs text-gray-400">
                ({ratingsQuantity} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl font-extrabold text-gray-900">
                {price} EGP
              </span>
              {priceAfterDiscount && (
                <>
                  <span className="text-sm text-gray-400 line-through font-medium">
                    {priceAfterDiscount} EGP
                  </span>
                  <span className="px-2.5 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold">
                    Save{" "}
                    {Math.round(
                      ((priceAfterDiscount - price) / priceAfterDiscount) * 100,
                    )}
                    %
                  </span>
                </>
              )}
            </div>

            <div className="mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-600">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock ({quantity || 10} available)
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed mb-6">
              {description}
            </p>

            <div className="bg-gray-50/80 p-4 rounded-2xl border border-gray-100 mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-gray-600">
                  Quantity:
                </span>
                <div className="flex items-center bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQty((prev) => Math.max(1, prev - 1))
                    }
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-sm font-bold text-gray-900">
                    {selectedQty}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQty((prev) =>
                        Math.min(quantity || 99, prev + 1),
                      )
                    }
                    className="px-3 py-1.5 text-gray-600 hover:bg-gray-100 transition-colors font-bold text-sm cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                  {quantity || 270} available
                </span>
              </div>

              <div className="flex ">
                <span className="text-[10px] md:text-xs text-gray-400 block font-normal text-right">
                  Total Price:
                </span>
                <span className="text-[12px] md:text-xl font-extrabold text-emerald-600">
                  {totalPrice} EGP
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 mb-4 w-full">
              <div className="w-full sm:flex-1 h-12">
                <AddToCart
                  productId={productId}
                  className="w-full h-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm cursor-pointer"
                >
                  <ShoppingCart size={18} /> Add to Cart
                </AddToCart>
              </div>

              <Link
                href={`/payment/${productId}`}
                className="w-full sm:flex-1 h-12 bg-slate-900 hover:bg-black text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors text-sm cursor-pointer"
              >
                <Zap fill="white" size={18} /> Buy Now
              </Link>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1">
                <WishlistButton
                  productId={productId}
                  initialInWishlist={initialInWishlist}
                  className="w-full py-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-xs font-semibold text-gray-700 flex items-center justify-center gap-2 transition-colors cursor-pointer"
                />
              </div>

              <button
                type="button"
                className="p-2.5 border border-gray-200 hover:bg-gray-50 rounded-xl text-gray-600 transition-colors cursor-pointer"
              >
                <Share2 size={16} />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/60 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100/60 rounded-xl text-emerald-700">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Free Delivery</p>
                  <p className="text-[10px] text-gray-500">
                    Orders over 500 EGP
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100/60 rounded-xl text-emerald-700">
                  <RotateCcw size={16} />
                </div>
                <div>
                  <p className="font-bold text-gray-800">30 Days Return</p>
                  <p className="text-[10px] text-gray-500">
                    Money back guarantee
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-emerald-100/60 rounded-xl text-emerald-700">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <p className="font-bold text-gray-800">Secure Payment</p>
                  <p className="text-[10px] text-gray-500">100% Protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 📑 Bottom Section: Product Tabs */}
      <div className="bg-white rounded-3xl border border-gray-100 p-6 md:p-8 shadow-sm">
        <Tabs defaultValue="details" className="">
          <TabsList className=" justify-start border-b border-gray-100 rounded-none bg-transparent p-0 h-auto gap-6 mb-6">
            <TabsTrigger
              value="details"
              className="text-sm font-bold pb-3 rounded-none border-b-2 border-transparent   data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-500 hover:text-[#16A34A] transition-all cursor-pointer px-0"
            >
              <BriefcaseBusiness /> Product Details
            </TabsTrigger>

            <TabsTrigger
              value="reviews"
              className="text-sm font-bold pb-3 rounded-none border-b-2 border-transparent   data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-500 hover:text-[#16A34A] transition-all cursor-pointer px-0"
            >
              <Star className="fill-accent" /> Reviews ({ratingsQuantity})
            </TabsTrigger>

            <TabsTrigger
              value="shipping"
              className="text-sm font-bold pb-3 rounded-none border-b-2 border-transparent   data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-500 hover:text-[#16A34A] transition-all cursor-pointer px-0"
            >
              <Van /> Shipping & Returns
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-0 outline-none">
            <div>
              <h3 className="text-base font-bold text-gray-900 mb-3">
                About this Product
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                {description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Product Information
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-semibold text-gray-800">
                        {category?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-gray-50">
                      <span className="text-gray-500">Brand:</span>
                      <span className="font-semibold text-gray-800">
                        {brand?.name || "N/A"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                    Key Features
                  </h4>
                  <ul className="space-y-2 text-xs text-gray-700">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />{" "}
                      Premium Quality Product
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />{" "}
                      100% Authentic Guarantee
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600" />{" "}
                      Fast & Secure Packaging
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-0 outline-none">
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-10 border-b border-gray-100">
                <div className="md:col-span-2 flex flex-col items-center justify-center text-center border-r-0 md:border-r border-gray-100 pr-0 md:pr-8">
                  <span className="text-5xl font-extrabold text-gray-900 tracking-tight mb-2">
                    {ratingsAverage || 4.4}
                  </span>

                  <div className="flex items-center gap-1 text-amber-400 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={
                          i < Math.floor(ratingsAverage || 4)
                            ? "fill-amber-400 text-amber-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <span className="text-xs text-gray-500 font-medium">
                    Based on {ratingsQuantity || 15} reviews
                  </span>
                </div>

                <div className="md:col-span-8 space-y-5">
                  {[
                    { stars: 5, label: "5 star", percentage: 25 },
                    { stars: 4, label: "4 star", percentage: 60 },
                    { stars: 3, label: "3 star", percentage: 25 },
                    { stars: 2, label: "2 star", percentage: 5 },
                    { stars: 1, label: "1 star", percentage: 5 },
                  ].map((item) => (
                    <div
                      key={item.stars}
                      className="flex items-center gap-4 text-xs"
                    >
                      <span className="w-12 text-gray-600 font-medium whitespace-nowrap">
                        {item.label}
                      </span>

                      <div className="flex-1 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-400 rounded-full transition-all duration-300"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>

                      <span className="w-10 text-right text-gray-500 font-medium">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="p-4 bg-gray-50 rounded-full mb-3 text-gray-300">
                  <Star size={36} className="fill-gray-200 text-gray-200" />
                </div>
                <p className="text-sm text-gray-600 font-medium mb-3">
                  Customer reviews will be displayed here.
                </p>
                <button
                  type="button"
                  className="text-sm font-bold text-emerald-600 hover:text-emerald-700 transition-colors hover:underline cursor-pointer"
                >
                  Write a Review
                </button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="shipping" className="mt-0 outline-none">
            <div className="space-y-6 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-main-color/20 border border-emerald-100/80 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-main-color text-white rounded-full">
                      <Truck size={20} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Shipping Information
                    </h3>
                  </div>

                  <ul className="space-y-3 text-xs text-gray-700">
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Free shipping on orders over 500 EGP</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Standard delivery: 3-5 business days</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>
                        Express delivery available (1-2 business days)
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Track your order in real-time</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-main-color/20 border border-emerald-100/80 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="p-2.5 bg-main-color text-white rounded-full">
                      <RotateCcw size={20} />
                    </div>
                    <h3 className="text-base font-bold text-gray-900">
                      Returns & Refunds
                    </h3>
                  </div>

                  <ul className="space-y-3 text-xs text-gray-700">
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>30-day hassle-free returns</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Full refund or exchange available</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Free return shipping on defective items</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <Check size={16} className="text-emerald-600 shrink-0" />
                      <span>Easy online return process</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 flex items-start sm:items-center gap-4">
                <div className="p-3 bg-gray-200/80 text-gray-700 rounded-full shrink-0">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1">
                    Buyer Protection Guarantee
                  </h4>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Get a full refund if your order doesn't arrive or isn't as
                    described. We ensure your shopping experience is safe and
                    secure.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* 🔹 قسم المنتجات المقترحة (You May Also Like) */}
      {relatedProducts.length > 0 && (
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
            {relatedProducts.map((item: SingleProductType) => (
              <SwiperSlide key={item._id || item.id} className="h-auto">
                <ProductCard prod={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      )}
    </div>
  );
}