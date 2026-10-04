"use client";
import { Gift, LogOut, Mail, Phone, User, UserPlus, Van } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function () {
  const { data } = useSession();

  function handleFNLogout() {
    signOut({
      redirectTo: "/login",
    });
  }

  // console.log(handleFNLogout);

  return (
    <div className="container hidden lg:block lg:text-sm ">
      <div className="p-1 flex items-center justify-between text-sm">
        {/* Left Side */}
        <div className="liftside flex items-center gap-5">
          <span className="flex items-center gap-2">
            <Van size={17} className="text-main-color" /> Free Shipping on
            Orders 500 EGP
          </span>
          <span className="flex items-center gap-2">
            <Gift size={17} className="text-main-color" /> New Arrivals Daily
          </span>
        </div>
        {/* Right Side - Contact */}
        <div className="rightside flex items-center gap-5">
          <a
            className="flex items-center gap-1 text-[#656D7C] hover:text-main-color"
            href="tel:+18001234567"
          >
            <Phone size={17} /> +1 (800) 123-4567
          </a>
          <a
            className="flex items-center gap-1 text-[#656D7C] hover:text-main-color"
            href="mailto:support@freshcart.com"
          >
            <Mail size={17} /> support@freshcart.com
          </a>
        </div>
        {/* Right Side - Auth */}

        {data ? (
          <div className="hidden md:flex ">
            <div className="">
              <span className="cursor-pointer flex items-center gap-1 text-[#6A7282]" onClick={handleFNLogout}>
                <LogOut /> Logout
              </span>
            </div>
          </div>
        ) : (
          <div className="rightside flex items-center gap-2 text-[#6A7282]">
            <Link
              href="/login"
              className="flex items-center gap-2 hover:text-main-color"
            >
              <UserPlus size={17} /> Sign In
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 hover:text-main-color"
            >
              <User size={17} /> Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
