import Link from "next/link";
import Image from "next/image";
import { getWishlist, removeProductFromWishlist } from "./wishlist.action";
import { getUserCart } from "../../components/AddToCart/AddToCart.action"; // عدل مسار getUserCart
import AddToCart from "@/components/AddToCart/AddToCart";
import { Heart, ShoppingCart, Trash } from "lucide-react";

export default async function WishlistPage() {
  const [wishlistRes, userCartRes] = await Promise.all([
    getWishlist(),
    getUserCart(),
  ]);

  const wishlistItems = wishlistRes?.data || [];
  const itemCount = wishlistRes?.count || wishlistItems.length || 0;

  const cartProductIds = new Set(
    userCartRes?.data?.products?.map(
      (item: any) => item.product?._id || item.product?.id || item.product
    ) || []
  );

  return (
    <main className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 min-h-screen">
      {/* 🔹 Breadcrumbs */}
      <nav className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 transition-colors">
          Home
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Wishlist</span>
      </nav>

      {/* 🔹 Title Section */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-500 shadow-sm">
          <Heart fill="#FB2C36" color="#FB2C36" size={22} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
          <p className="text-xs text-gray-500 font-normal mt-0.5">
            {itemCount} {itemCount === 1 ? "item saved" : "items saved"}
          </p>
        </div>
      </div>

      {wishlistItems.length > 0 ? (
        <>
          {/* 📱 1. الموبايل والتابلت */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mb-8">
            {wishlistItems.map((item: any) => {
              const itemId = item._id || item.id;
              const isAlreadyInCart = cartProductIds.has(itemId);

              return (
                <div
                  key={itemId}
                  className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex flex-col justify-between"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-20 h-20 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                      <Image
                        src={item.imageCover || item.images?.[0]}
                        alt={item.title || "Product"}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <div className="overflow-hidden flex-1">
                      <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                        {item.category?.name || "Category"}
                      </span>
                      <h3 className="text-sm font-bold text-gray-900 truncate mt-1">
                        {item.title}
                      </h3>
                      <p className="text-sm font-extrabold text-gray-900 mt-1">
                        {item.price} EGP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-50 gap-2 w-full">
                    {/* زر الإضافة للموبايل يفرش المساحة بالكامل w-full flex-1 */}
                    {isAlreadyInCart ? (
                      <Link
                        href="/cart"
                        className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition-colors shadow-sm"
                      >
                        <ShoppingCart size={16} /> ✓ View Cart
                      </Link>
                    ) : (
                      <AddToCart
                        productId={itemId}
                        className="w-full flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                      >
                        <ShoppingCart size={16} /> add to cart
                      </AddToCart>
                    )}

                    {/* زر الحذف */}
                    <form action={removeProductFromWishlist.bind(null, itemId)}>
                      <button
                        type="submit"
                        title="Remove Item"
                        className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-xl transition-all cursor-pointer shrink-0"
                      >
                        <Trash size={18} />
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 💻 2. شاشات الكمبيوتر LG+ */}
          <div className="hidden lg:block bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden mb-8 w-full">
            <div className="grid grid-cols-12 bg-gray-50/70 px-8 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-gray-100 w-full">
              <div className="col-span-5">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-3 text-right">Actions</div>
            </div>

            <div className="divide-y divide-gray-100 w-full">
              {wishlistItems.map((item: any) => {
                const itemId = item._id || item.id;
                const isAlreadyInCart = cartProductIds.has(itemId);

                return (
                  <div
                    key={itemId}
                    className="grid grid-cols-12 items-center px-8 py-5 hover:bg-gray-50/40 transition-colors w-full"
                  >
                    <div className="col-span-5 flex items-center gap-4">
                      <div className="relative w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <Image
                          src={item.imageCover || item.images?.[0]}
                          alt={item.title || "Product"}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-sm font-bold text-gray-900 truncate">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-400 mt-1">
                          {item.category?.name || "Category"}
                        </p>
                      </div>
                    </div>

                    <div className="col-span-2 text-center">
                      <span className="text-sm font-extrabold text-gray-900">
                        {item.price} EGP
                      </span>
                    </div>

                    <div className="col-span-2 text-center">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium ${
                          isAlreadyInCart
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {isAlreadyInCart ? (
                          <>
                            <ShoppingCart className="w-3.5 h-3.5 fill-emerald-400 text-emerald-600" />
                            In Cart
                          </>
                        ) : (
                          "In Stock"
                        )}
                      </span>
                    </div>

                    <div className="col-span-3 flex items-center justify-end gap-3">
                      {isAlreadyInCart ? (
                        <Link
                          href="/cart"
                          className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-xl transition-colors shadow-sm"
                        >
                          <ShoppingCart size={16} /> ✓ View Cart
                        </Link>
                      ) : (
                        <AddToCart
                          productId={itemId}
                          className="inline-flex items-center gap-2 px-4 py-3 bg-main-color hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl transition-colors shadow-sm cursor-pointer"
                        >
                          <ShoppingCart size={16} /> add to cart
                        </AddToCart>
                      )}

                      <form action={removeProductFromWishlist.bind(null, itemId)}>
                        <button
                          type="submit"
                          title="Remove Item"
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 border border-gray-200 hover:border-red-200 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash size={18} />
                        </button>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-emerald-600 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-100 p-12 text-center shadow-sm mb-8 w-full">
          <div className="w-16 h-16 bg-red-50 rounded-full mx-auto mb-4 text-2xl text-red-500 flex items-center justify-center">
            <Heart size={32} className="mx-auto" />
          </div>
          <h2 className="text-lg font-bold text-gray-900 mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto mb-6">
            You haven't added any products to your wishlist yet.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl transition-colors shadow-sm"
          >
            Explore Products
          </Link>
        </div>
      )}
    </main>
  );
}