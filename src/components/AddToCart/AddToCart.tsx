"use client";

import { useContext, ComponentPropsWithoutRef } from "react";
import AppButton from "../AppButton/AppButton";
import { toast } from "../ui/toast";
import { addProductUserToCart } from "./AddToCart.action";
import { CartCounterProvider } from "@/Context/CartCound/CartCound";
import { Plus } from "lucide-react";

// 🔹 دعم جميع الـ Props الخاصة بالزر + الـ productId والـ children
interface AddToCartProps extends ComponentPropsWithoutRef<typeof AppButton> {
  productId: string;
  children?: React.ReactNode;
}

export default function AddToCart({
  productId,
  children,
  className,
  ...props
}: AddToCartProps) {
  const { setcount } = useContext(CartCounterProvider);

  function addProductTocart() {
    toast.promise(addProductUserToCart(productId), {
      loading: "Adding to cart...",
      success: (data) => {
        setcount(data.numOfCartItems);
        return data.message;
      },
      error: "An error occurred",
    });
  }

  return (
    <AppButton
      onClick={addProductTocart}
      className={
        className || "bg-main-color w-9 h-9 rounded-full p-3 hover:bg-main-color/80"
      }
      {...props} // 👈 هنا يتم توزيع الـ props الأخرى بالكامل
    >
      {children || <Plus className="h-4 w-4 text-white" />}
    </AppButton>
  );
}
