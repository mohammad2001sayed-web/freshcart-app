"use client";
import {
  Apple,
  ArrowLeft,
  Carrot,
  House,
  Leaf,
  ShoppingCart,
  Sprout,
} from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-linear-to-br from-white via-slate-50 to-emerald-50/30 flex items-center justify-center px-4 py-10">
      {/* Floating Apple - Top Left */}
      <Apple
        className="absolute top-8 left-[5%] text-emerald-200/80 rotate-12 animate-float"
        size={38}
        fill="currentColor"
        strokeWidth={2}
      />

      {/* Floating Carrot - Top Right */}
      <Carrot
        className="absolute top-28 right-[8%] text-emerald-200/70 -rotate-25"
        size={32}
        fill="currentColor"
        strokeWidth={2}
      />

      {/* Floating Apple - Left Middle */}
      <Apple
        className="absolute top-[48%] left-[14%] text-emerald-100 rotate-12 animate-float"
        size={25}
        fill="currentColor"
        strokeWidth={2}
      />

      {/* Floating Carrot - Right Middle */}
      <Carrot
        className="absolute top-28 right-[8%] text-emerald-200/70 -rotate-25 animate-float [animation-delay:2s]"
        size={30}
        fill="currentColor"
        strokeWidth={2}
      />

      {/* Floating Leaf - Bottom Left */}
      <Leaf
        className="absolute bottom-[22%] animate-bounce left-[8%] text-emerald-200/80 -rotate-20"
        size={38}
        fill="currentColor"
        strokeWidth={2}
      />

      {/* Floating Sprout - Bottom Right */}
      <Sprout
        className="absolute  bottom-[15%] right-[15%] text-emerald-200/80 animate-float"
        size={42}
        fill="currentColor"
        strokeWidth={2}
      />

      {/* Main Content */}
      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center text-center">
        {/* Cart Illustration */}
        <div className="relative mb-10">
          {/* Cart Box */}
          <div className="relative flex h-44 w-60 items-center justify-center rounded-3xl border border-emerald-50 bg-white shadow-[0_15px_40px_rgba(16,185,129,0.08)]">
            <ShoppingCart
              size={72}
              strokeWidth={1.8}
              className="text-emerald-400"
            />

            {/* 404 Circle */}
            <div className="absolute -right-8 -top-8 flex h-24 w-24 items-center justify-center rounded-full border-8 border-white bg-emerald-500 shadow-[0_10px_25px_rgba(16,185,129,0.25)]">
              <span className="text-2xl font-black text-white">404</span>
            </div>
          </div>

          {/* Little dots under cart */}
          <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-4">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

            <span className="h-4 w-8 rounded-b-full border-b-2 border-emerald-400" />

            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="mb-3 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
          Oops! Nothing Here
        </h1>

        {/* Description */}
        <p className="max-w-xl text-base leading-7 text-slate-500 md:text-lg">
          Looks like this page went out of stock! Don&apos;t worry,
          <br className="hidden md:block" />
          there&apos;s plenty more fresh content to explore.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row">
          {/* Home */}
          <Link
            href="/"
            className="flex h-15 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 text-base font-bold text-white shadow-[0_8px_20px_rgba(16,185,129,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-emerald-700"
          >
            <House size={20} fill="currentColor" />

            <span>Go to Homepage</span>
          </Link>

          {/* Back */}
          <button
            onClick={() => window.history.back()}
            className="flex h-15 items-center justify-center gap-3 rounded-xl border border-slate-200 bg-white px-8 text-base font-bold text-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-50"
          >
            <ArrowLeft size={20} />

            <span>Go Back</span>
          </button>
        </div>

        {/* Popular Destinations */}
        <div className="mt-12 w-full max-w-xl rounded-3xl border border-slate-100 bg-white p-6 shadow-[0_5px_20px_rgba(15,23,42,0.06)]">
          <p className="mb-4 text-sm font-medium tracking-wide text-slate-400">
            POPULAR DESTINATIONS
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/shope"
              className="rounded-xl bg-emerald-50 px-5 py-3 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100"
            >
              All Products
            </Link>

            <Link
              href="/categories"
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Categories
            </Link>

            <Link
              href="/"
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Today&apos;s Deals
            </Link>

            <Link
              href="/contact"
              className="rounded-xl bg-slate-100 px-5 py-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-200"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
