"use client";
import CartCound from "@/Context/CartCound/CartCound";
import { SessionProvider } from "next-auth/react";

export default function MySession({ children }: { children: React.ReactNode }) {
  return <SessionProvider>
    <CartCound>

    {children}
    </CartCound>
  </SessionProvider>;
}
