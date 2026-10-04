"use client";

import { getUserCart } from "@/components/AddToCart/AddToCart.action";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

export const CartCounterProvider = createContext<{
  count: number;
  setcount: Dispatch<SetStateAction<number>>;
}>({
  count: 0,
  setcount: () => {},
});

export default function CartCound({
  children,
}: {
  children: React.ReactNode;
}) {
  const [count, setcount] = useState(0);

  useEffect(() => {
    getUserCart().then((data) => {
      if (data?.numOfCartItems !== undefined) {
        setcount(data.numOfCartItems);
      }
    });
  }, []);
  return (
    <CartCounterProvider value={{ count, setcount }}>
      {children}
    </CartCounterProvider>
  );
}