import ProductCard from "@/components/ProductCard/ProductCard";
import { getAllProducts } from "./home.services";
import Slider from "@/components/Slider/Slider";
import Image from "next/image";

import HomeSlider from "@/components/HomeSlider/HomeSlider";
// import CategorySlider from "@/components/CategorySlider/CategorySlider";
import { lazy, Suspense } from "react";
import ServiceFeatures from "@/components/ServiceFeatures/ServiceFeatures";
import CategorySlider from "@/components/CategorySlider/CategorySlider";
import DealsSection from "@/components/DealsSection/DealsSection";
import ShopByCategory from "@/components/ShopByCategory/ShopByCategory";
import NewsletterAppBanner from "@/components/NewsletterAppBanner/NewsletterAppBanner";

const Mo = lazy(() => import("@/components/CategorySlider/CategorySlider"));
// serch next dinamic

export default async function Home() {
  const productList = await getAllProducts();

  return (
    <>
      <HomeSlider />
      <div className="container my-10">
        <ServiceFeatures variant="home" />
        <ShopByCategory />
        <DealsSection />
        {/* <Suspense
          fallback={<div className="text-8xl text-red-800">Loading...</div>}
          >
          <Mo />
          </Suspense>  */}
        {/* <CategorySlider/> */}

        <div className=" my-10">
          <div className="flex items-center justify-between -mb-9">
            <div className="flex items-center gap-2">
              {/* الخط الأخضر الرأسي */}
              <span className="w-1.5 h-7 bg-emerald-600 rounded-full inline-block"></span>
              <h2 className="text-2xl font-bold text-gray-900">
                Featured <span className="text-emerald-600">Products</span>
              </h2>
            </div>
          </div>

          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 mt-20">
            {productList.map((e) => (
              <ProductCard  key={e._id} prod={e} />
            ))}
          </div>
              <NewsletterAppBanner/>

        </div>
      </div>
    </>
  );
}
