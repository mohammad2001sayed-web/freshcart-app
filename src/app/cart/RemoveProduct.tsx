"use client";

import { useContext } from "react";
import AppButton from "@/components/AppButton/AppButton";
import { handleRemoveProduct } from "./cart.action";
import { CartCounterProvider } from "@/Context/CartCound/CartCound"; // 👈 استيراد الـ Context
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";

export default function RemoveProduct({ productId }: { productId: string }) {
  const { setcount } = useContext(CartCounterProvider); // 👈 جلب دالة setcount

  async function removeProduct() {
    const res = await handleRemoveProduct(productId);
    
    // 🔴 تحديث عدد عناصر السلة فوراً في الـ Navbar عند المسح
    if (res?.numOfCartItems !== undefined) {
      setcount(res.numOfCartItems);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<AppButton variant={"destructive"}>Remove</AppButton>}
      />
      <AlertDialogContent className="p-5 flex flex-col items-center gap-5 justify-center text-center">
        <AlertDialogHeader className="flex flex-col items-center gap-4 justify-center text-center">
          <AlertDialogTitle className="self-center bg-[#FFE2E2] p-4 rounded-full">
            <Trash color="#FB2C36" />
          </AlertDialogTitle>
          <AlertDialogTitle className="self-center font-bold">
            Remove Item?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Remove Woman Shawl from your cart?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-200 p-5">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 p-5"
            onClick={removeProduct}
          >
            Remove
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}