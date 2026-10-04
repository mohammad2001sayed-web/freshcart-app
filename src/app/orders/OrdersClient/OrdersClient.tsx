"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Package,
  CalendarDays,
  Boxes,
  MapPin,
  Phone,
  ChevronUp,
  ChevronDown,
  ShoppingBag,
  Clock,
  CheckCircle2,
} from "lucide-react";
import type { OrderType } from "../types";

interface OrdersClientProps {
  orders: OrderType[];
}

export default function OrdersClient({ orders }: OrdersClientProps) {
  // كل الأوردرات مفتوحة افتراضيًا
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(new Set());

  function toggleOrder(orderId: string) {
    setCollapsedIds((prev) => {
      const next = new Set(prev);
      if (next.has(orderId)) next.delete(orderId);
      else next.add(orderId);
      return next;
    });
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="container my-10 space-y-6">
      {/* ----- Header ----- */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-gray-900">
              My Orders
            </h1>
            <p className="text-xs md:text-sm text-gray-500 mt-0.5">
              Track and manage your {orders.length} order{orders.length !== 1 ? "s" : ""}
            </p>
          </div>
        </div>

        <Link
          href="/"
          className="text-xs md:text-sm font-semibold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          Continue Shopping
        </Link>
      </div>

      {/* ----- Empty state ----- */}
      {orders.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100 flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-gray-900">
              No Orders Yet
            </h3>
            <p className="text-xs md:text-sm text-gray-500 max-w-sm">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
          </div>
          <Link
            href="/"
            className="bg-emerald-600 text-white text-xs md:text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-emerald-700 transition-all flex items-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Start Shopping
          </Link>
        </div>
      )}

      {/* ----- Orders list ----- */}
      {orders.map((order) => {
        const isCollapsed = collapsedIds.has(order._id);
        const totalItemsCount = order.cartItems.reduce(
          (sum, item) => sum + item.count,
          0,
        );
        const mainItem = order.cartItems[0];
        const extraItemsCount = order.cartItems.length - 1;

        return (
          <div
            key={order._id}
            className="bg-white rounded-2xl border border-emerald-100 shadow-sm overflow-hidden"
          >
            {/* Header of each order */}
            <div className="p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                {/* Thumbnail */}
                <div className="relative w-14 h-14 shrink-0 rounded-xl bg-gray-50 border border-gray-100 overflow-hidden">
                  {mainItem?.product?.imageCover && (
                    <Image
                      src={mainItem.product.imageCover}
                      alt={mainItem.product.title}
                      fill
                      className="object-contain p-1.5"
                    />
                  )}
                  {extraItemsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-gray-900 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      +{extraItemsCount}
                    </span>
                  )}
                </div>

                <div className="space-y-1.5">
                  {/* Status badge */}
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      order.isDelivered
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {order.isDelivered ? (
                      <CheckCircle2 className="w-3 h-3" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {order.isDelivered ? "Delivered" : "Processing"}
                  </span>

                  {/* Meta row */}
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span className="font-bold text-gray-900">
                      #{order.id}
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarDays className="w-3.5 h-3.5" />
                      {formatDate(order.createdAt)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Boxes className="w-3.5 h-3.5" />
                      {totalItemsCount} items
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      {order.shippingAddress?.city || "—"}
                    </span>
                  </div>

                  <p className="text-lg font-extrabold text-gray-900">
                    {order.totalOrderPrice}{" "}
                    <span className="text-xs font-semibold text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
              </div>

              {/* Collapse / expand button */}
              <button
                onClick={() => toggleOrder(order._id)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isCollapsed ? "Show" : "Hide"}
                {isCollapsed ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </button>
            </div>

            {/* Expandable content */}
            {!isCollapsed && (
              <div className="border-t border-gray-100 p-5 space-y-5">
                {/* Order items */}
                <div>
                  <h4 className="flex items-center gap-2 text-xs font-bold text-gray-900 mb-3">
                    <span className="w-2 h-2 rounded-sm bg-emerald-500" />
                    Order Items
                  </h4>

                  <div className="divide-y divide-gray-50">
                    {order.cartItems.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center justify-between gap-3 py-3"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="relative w-10 h-10 shrink-0 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden">
                            {item.product?.imageCover && (
                              <Image
                                src={item.product.imageCover}
                                alt={item.product.title}
                                fill
                                className="object-contain p-1"
                              />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-emerald-700 truncate">
                              {item.product?.title}
                            </p>
                            <p className="text-xs text-gray-400">
                              {item.count} × {item.price} EGP
                            </p>
                          </div>
                        </div>

                        <p className="text-sm font-bold text-gray-900 shrink-0">
                          {item.count * item.price}{" "}
                          <span className="text-[10px] font-semibold text-gray-400">
                            EGP
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery address + order summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Delivery address */}
                  <div className="bg-gray-50/60 rounded-xl border border-gray-100 p-4">
                    <h5 className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-2">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                      Delivery Address
                    </h5>
                    <p className="text-xs font-semibold text-gray-700">
                      {order.shippingAddress?.city}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {order.shippingAddress?.details}
                    </p>
                    <p className="text-xs text-gray-500 mt-1.5 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {order.shippingAddress?.phone}
                    </p>
                  </div>

                  {/* Order summary */}
                  <div className="bg-amber-50/60 rounded-xl border border-amber-100 p-4">
                    <h5 className="flex items-center gap-1.5 text-xs font-bold text-gray-900 mb-2">
                      <Package className="w-3.5 h-3.5 text-amber-600" />
                      Order Summary
                    </h5>

                    <div className="flex items-center justify-between text-xs text-gray-600 py-0.5">
                      <span>Subtotal</span>
                      <span className="font-semibold">
                        {order.totalOrderPrice -
                          (order.shippingPrice || 0) -
                          (order.taxPrice || 0)}{" "}
                        EGP
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600 py-0.5">
                      <span>Shipping</span>
                      <span className="font-semibold">
                        {order.shippingPrice
                          ? `${order.shippingPrice} EGP`
                          : "Free"}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-sm font-extrabold text-gray-900 pt-2 mt-1.5 border-t border-amber-200">
                      <span>Total</span>
                      <span>{order.totalOrderPrice} EGP</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}