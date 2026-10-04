"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, MapPin, Settings, ChevronRight } from "lucide-react";

// ⚠️ تأكد من وجود الكلمتين export default هنا
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      {/* Top Banner Header */}
      <div className="bg-[#00a651] text-white py-8 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2 text-xs md:text-sm text-emerald-100 font-medium">
            <Link href="/" className="hover:underline">Home</Link>
            <span>/</span>
            <span>My Account</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shrink-0">
              <User className="w-8 h-8 md:w-9 md:h-9 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
                My Account
              </h1>
              <p className="text-xs md:text-sm text-emerald-100 mt-1">
                Manage your addresses and account settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3">
            <h2 className="text-sm font-bold text-gray-900 px-3 pt-1">
              My Account
            </h2>

            <div className="space-y-1.5">
              <Link
                href="/Profile"
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname === "/Profile" || pathname === "/profile"
                    ? "bg-emerald-50 text-[#00a651]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    pathname === "/Profile" || pathname === "/profile" ? "bg-[#00a651] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    <MapPin className="w-4 h-4" />
                  </div>
                  <span>My Addresses</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>

              <Link
                href="/Profile/settings"
                className={`w-full flex items-center justify-between p-3 rounded-xl text-sm font-semibold transition-all ${
                  pathname?.includes("/settings")
                    ? "bg-emerald-50 text-[#00a651]"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    pathname?.includes("/settings") ? "bg-[#00a651] text-white" : "bg-gray-100 text-gray-500"
                  }`}>
                    <Settings className="w-4 h-4" />
                  </div>
                  <span>Settings</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Content */}
          <div className="lg:col-span-9">
            {children}
          </div>

        </div>
      </div>
    </div>
  );
}