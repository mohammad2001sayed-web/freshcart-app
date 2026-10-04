"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { addProductToWishlist, removeProductFromWishlist } from "@/app/wishlist/wishlist.action";

interface WishlistButtonProps {
  productId: string;
  initialInWishlist?: boolean; // هل المنتج في المفضلة أساساً أم لا
  size?: number;
  className?: string;
}

export default function WishlistButton({
  productId,
  initialInWishlist = false,
  size = 18,
  className = "",
}: WishlistButtonProps) {
  const [isInWishlist, setIsInWishlist] = useState<boolean>(initialInWishlist);
  const [isPending, startTransition] = useTransition();

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault(); // لمنع التوجيه لو كان الزر داخل Link
    e.stopPropagation();

    // 1️⃣ تغيير الشكل للأحمر فوراً في الـ UI
    const nextState = !isInWishlist;
    setIsInWishlist(nextState);

    // 2️⃣ إرسال الطلب للسيرفر في الخلفية
    startTransition(async () => {
      if (nextState) {
        // إضافة للمفضلة
        const res = await addProductToWishlist(productId);
        if (res?.status === "fail") {
          setIsInWishlist(false); // إرجاع الحالة لو فشل الطلب
        }
      } else {
        // حذف من المفضلة
        const res = await removeProductFromWishlist(productId);
        if (res?.status === "fail") {
          setIsInWishlist(true); // إرجاع الحالة لو فشل الطلب
        }
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleToggleWishlist}
      disabled={isPending}
      title={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      className={`p-2 rounded-full transition-all duration-300 flex items-center justify-center ${
        isInWishlist
          ? "bg-red-50 text-red-500 scale-105"
          : "bg-gray-100/80 text-gray-400 hover:text-red-500 hover:bg-red-50"
      } ${className}`}
    >
      <Heart
        size={size}
        className={`transition-all duration-300 ${
          isInWishlist
            ? "fill-red-500 text-red-500 scale-110"
            : "fill-none stroke-current"
        }`}
      />
    </button>
  );
}