import { getUserCart } from "@/components/AddToCart/AddToCart.action";
import UpdateProductCount from "./UpdateProductCount";
import RemoveProduct from "./RemoveProduct";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2, User } from "lucide-react";

export default async function page() {
  const {
    cartId,
    numOfCartItems,
    data: { totalCartPrice, products },
  } = await getUserCart();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* هيدر الصفحة */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-1">
          <div className="bg-[#00a651] text-white p-2 rounded-xl">
            <ShoppingCart size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#0a1120]">Shopping Cart</h1>
        </div>
        <p className="text-gray-500 text-sm">
          You have <span className="text-[#00a651] font-bold">{numOfCartItems} items</span> in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start ">
        {/* الجزء الأيسر: قائمة المنتجات */}
        <div className="lg:col-span-8 space-y-4 ">
          {products.map((e) => (
            <div
              key={e._id}
              className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4"
            >
              {/* صورة المنتج والمعلومات */}
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="w-24 h-24 bg-gray-50 rounded-xl p-2 border border-gray-100 shrink-0 flex items-center justify-center">
                  <img
                    className="max-h-full max-w-full object-contain"
                    src={e.product.imageCover}
                    alt={e.product.title}
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-gray-900 text-base">
                    {e.product.title}
                  </h3>
                  {e.product.category?.name && (
                    <span className="inline-block bg-[#e6f7ef] text-[#00a651] text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {e.product.category.name}
                    </span>
                  )}
                  <p className="text-[#00a651] font-bold text-base">
                    {e.price} EGP
                  </p>

                  {/* الـ Counter باستخدام الـ Component بتاعك UpdateProductCount */}
                  <div className="flex items-center gap-2 bg-gray-100/80 p-1 rounded-xl w-fit mt-2">
                    <UpdateProductCount productId={e.product._id} count={e.count - 1}>
                      <span className="w-7 h-7 bg-white rounded-lg flex items-center justify-center font-bold text-gray-600 shadow-sm cursor-pointer hover:bg-gray-50">
                        -
                      </span>
                    </UpdateProductCount>

                    <span className="px-3 font-bold text-sm text-gray-800">
                      {e.count}
                    </span>

                    <UpdateProductCount productId={e.product._id} count={e.count + 1}>
                      <span className="w-7 h-7 bg-[#00a651] text-white rounded-lg flex items-center justify-center font-bold text-sm cursor-pointer hover:bg-[#008e45]">
                        +
                      </span>
                    </UpdateProductCount>
                  </div>
                </div>
              </div>

              {/* السعر الإجمالي للمنتج + زر الحذف باستعمال RemoveProduct */}
              <div className="flex items-center justify-between md:justify-end gap-6 w-full md:w-auto border-t md:border-t-0 pt-3 md:pt-0 border-gray-100">
                <div className="text-right">
                  <span className="text-[11px] text-gray-400 block font-medium">Total</span>
                  <span className="text-xl font-black text-gray-900">
                    {e.price * e.count}{" "}
                    <span className="text-xs font-bold text-gray-500">EGP</span>
                  </span>
                </div>

                {/* زرار الحذف الخاص بيك */}
                <div className="bg-red-50 text-red-500 p-2.5 rounded-xl cursor-pointer hover:bg-red-100 transition-colors">
                  <RemoveProduct productId={e.product._id} />
                </div>
              </div>
            </div>
          ))}

          {/* روابط أسفل الكروت */}
          <div className="flex items-center justify-between pt-2">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[#00a651] hover:underline font-bold text-sm"
            >
              <ArrowLeft size={16} /> Continue Shopping
            </Link>

            <button className="flex items-center gap-1 text-gray-400 hover:text-red-500 text-xs font-medium transition-colors">
              <Trash2 size={14} /> Clear all items
            </button>
          </div>
        </div>

        {/* الجزء الأيمن: ملخص الطلب Order Summary */}
        <div className="lg:col-span-4 sticky top-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="bg-[#0a1120] text-white p-4">
              <h2 className="font-bold text-base">Order Summary</h2>
            </div>

            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Subtotal ({numOfCartItems} items)</span>
                <span className="font-bold text-gray-900">{totalCartPrice} EGP</span>
              </div>

              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-[#00a651] font-semibold text-xs">
                  Calculated at checkout
                </span>
              </div>

              <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                <span className="font-extrabold text-gray-900">Estimated Total</span>
                <span className="text-xl font-black text-[#00a651]">
                  {totalCartPrice} EGP
                </span>
              </div>

              {/* زر الدفع باستخدام اللينك الخاص بيك */}
              <Link
                href={`/payment/${cartId}`}
                className="w-full py-3 bg-[#00a651] hover:bg-[#008e45] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all text-sm block text-center"
              >
                <User size={18} /> Login to Checkout
              </Link>

              <p className="text-center text-xs text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#00a651] hover:underline font-bold">
                  Sign up
                </Link>
              </p>

              {/* قائمة المميزات */}
              <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2">
                  <span className="text-[#00a651]">✓</span> Your cart items will be saved
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00a651]">✓</span> Track your orders easily
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[#00a651]">✓</span> Access exclusive member deals
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}