// "use client";

// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { addProductUserToCart } from "../../components/AddToCart/AddToCart.action"; // عدل المسار لدالتك

// interface Props {
//   productId: string;
// }

// export default function WishlistCartButton({ productId }: Props) {
//   const [inCart, setInCart] = useState<boolean>(false);
//   const [isPending, startTransition] = useTransition();
//   const router = useRouter();

//   const handleCartClick = () => {
//     // 1️⃣ لو المنتج اتضاف خلاص وبقى عليه الصح -> توجيه لصفحة الـ Cart
//     if (inCart) {
//       router.push("/cart");
//       return;
//     }

//     // 2️⃣ لو المنتج مش في السلة -> ضيفه وخليه يتغير لـ View Cart
//     startTransition(async () => {
//       const res = await addProductUserToCart(productId);
//       if (res?.success !== false) {
//         setInCart(true); // يتحول فوراً لـ View Cart مع علامه الصح
//       }
//     });
//   };

//   return (
//     <div className="flex items-center gap-4">
//       {/* 🔹 الـ Status Badge المتغير بحسب الحالة */}
//       <span
//         className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium ${
//           inCart
//             ? "bg-emerald-50 text-emerald-600"
//             : "bg-gray-100 text-gray-600"
//         }`}
//       >
//         {inCart ? "🛒 In Cart" : "In Stock"}
//       </span>

//       {/* 🔹 زر الأكشن الذكي */}
//       <button
//         type="button"
//         onClick={handleCartClick}
//         disabled={isPending}
//         className={`inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-300 shadow-sm cursor-pointer ${
//           inCart
//             ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-800"
//             : "bg-emerald-600 hover:bg-emerald-700 text-white"
//         } ${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
//       >
//         {isPending ? (
//           <span className="animate-spin">⏳</span>
//         ) : inCart ? (
//           <>
//             <span>✓</span> View Cart
//           </>
//         ) : (
//           <>
//             <span>+</span> Add to Cart
//           </>
//         )}
//       </button>
//     </div>
//   );
// }