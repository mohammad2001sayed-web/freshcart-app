"use client";

import  { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, ArrowRight, Leaf, Truck, Tag, Smartphone, Star, Sparkles, Loader2 } from "lucide-react";

// تحديد نوع البيانات المدخلة
interface NewsletterInputs {
  email: string;
}

export default function NewsletterAppBanner() {
  const [status, setStatus] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // تهيئة useForm
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInputs>({
    defaultValues: {
      email: "",
    },
  });

  // دالة الإرسال مع API
const onSubmit = async (data: NewsletterInputs) => {
  setStatus(null);
  try {
    // 🔹 استبدل المحاكاة بالـ API الحقيقي هنا
    const response = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error("Failed");

    setStatus({ type: "success", text: "Subscribed successfully!" });
    reset();
  } catch (error) {
    setStatus({ type: "error", text: "Something went wrong. Try again." });
  }
};  return (
    <section className="w-full my-9 bg-[#F5FEFA] max-w-6xl mx-auto p-6 md:p-8 bg-linear-to-br from-emerald-50/60 via-white to-emerald-50/30 rounded-3xl border border-emerald-100/60 shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* 👈 Left Section: Newsletter Subscribe */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Header Tag */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#00a651] text-white flex items-center justify-center shadow-md shadow-emerald-200">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-[#00a651]">
                Newsletter
              </span>
              <span className="text-xs text-gray-500 font-medium">
                50,000+ subscribers
              </span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-1">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 leading-tight">
              Get the Freshest Updates
            </h2>
            <h2 className="text-2xl md:text-3xl font-extrabold text-[#00a651] leading-tight">
              Delivered Free
            </h2>
            <p className="text-sm text-gray-500 pt-1">
              Weekly recipes, seasonal offers & exclusive member perks.
            </p>
          </div>

          {/* Badges / Features */}
          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-100 shadow-sm">
              <Leaf className="w-3.5 h-3.5 text-[#00a651]" />
              Fresh Picks Weekly
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-100 shadow-sm">
              <Truck className="w-3.5 h-3.5 text-[#00a651]" />
              Free Delivery Codes
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-gray-700 border border-gray-100 shadow-sm">
              <Tag className="w-3.5 h-3.5 text-[#00a651]" />
              Members-Only Deals
            </span>
          </div>

          {/* Form with React Hook Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="pt-2 space-y-2">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <div className="w-full sm:flex-1">
                <input
                  type="email"
                  placeholder="you@example.com"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className="w-full px-4 py-3 text-sm rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00a651] focus:border-transparent transition shadow-sm placeholder:text-gray-400"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-[#00a651] hover:bg-[#008e45] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

            {/* عرض أخطاء الـ Validation */}
            {errors.email && (
              <p className="text-xs text-red-500 font-medium px-1">
                {errors.email.message}
              </p>
            )}

            {/* رسالة نجاح أو فشل الإرسال */}
            {status && (
              <p className={`text-xs font-medium px-1 ${status.type === "success" ? "text-[#00a651]" : "text-red-500"}`}>
                {status.text}
              </p>
            )}

            <p className="flex items-center gap-1.5 text-[11px] text-gray-400 mt-2.5">
              <Sparkles className="w-3 h-3 text-amber-500" />
              Unsubscribe anytime. No spam, ever.
            </p>
          </form>

        </div>

        {/* 👉 Right Section: Mobile App Dark Card */}
        <div className="lg:col-span-5">
          <div className="bg-linear-to-b from-slate-900 via-slate-900 to-[#0d1f18] text-white p-6 md:p-7 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-[#00a651] text-[11px] font-bold uppercase tracking-wide mb-4">
              <Smartphone className="w-3 h-3" />
              Mobile App
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-xl font-extrabold text-white mb-1.5">
              Shop Faster on Our App
            </h3>
            <p className="text-xs text-slate-400 mb-6 leading-relaxed">
              Get app-exclusive deals & 15% off your first order.
            </p>

            {/* Store Buttons */}
            <div className="space-y-3 mb-6">
              {/* App Store */}
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition text-left group"
              >
                <svg className="w-6 h-6 fill-current text-white shrink-0" viewBox="0 0 384 512">
                  <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-15 69.5-34.3z"/>
                </svg>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Download on
                  </span>
                  <span className="block text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    App Store
                  </span>
                </div>
              </a>

              {/* Google Play */}
              <a
                href="#"
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 transition text-left group"
              >
                <svg className="w-5 h-5 fill-current text-white shrink-0 ml-0.5" viewBox="0 0 512 512">
                  <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6l-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l220.7-221.3 60.1 60.1L104.6 499z"/>
                </svg>
                <div>
                  <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Get it on
                  </span>
                  <span className="block text-xs font-bold text-white group-hover:text-emerald-400 transition-colors">
                    Google Play
                  </span>
                </div>
              </a>
            </div>

            {/* Ratings Footer */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-800/80 text-xs text-slate-400">
              <div className="flex text-amber-400 gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold text-slate-300">4.9</span>
              <span>•</span>
              <span>100K+ downloads</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}