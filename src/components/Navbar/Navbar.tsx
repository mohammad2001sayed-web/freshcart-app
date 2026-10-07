"use client";

import React from "react";
import Link from "next/link";
import {
  ChevronDown,
  CircleUserRound,
  Contact,
  Headset,
  Heart,
  LogOut,
  MapPin,
  Menu,
  Package,
  Search,
  Settings,
  ShoppingCart,
  User,
  UserPlus,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import { Input } from "@base-ui/react";
import { signOut, useSession } from "next-auth/react";
import AppButton from "../AppButton/AppButton";
import FristNav from "../FristNav/FristNav";
import { CartCounterProvider } from "@/Context/CartCound/CartCound";
import { Badge } from "../ui/badge";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// 🔹 مصفوفة الروابط المخصصة لكل قسم مع الـ ID الخاص به في الـ API
const categoriesNav = [
  { name: "All categories", href: "/categorise" },
  { name: "Electronics", href: "/categorise/6439d2d167d9aa4ca970649f" },
  { name: "Women's Fashion", href: "/categorise/6439d58a0049ad0b52b9003f" },
  { name: "Men's Fashion", href: "/categorise/6439d5b90049ad0b52b90048" },
  { name: "Beauty & Health", href: "/categorise/6439d30b67d9aa4ca97064b1" },
];

export default function Navbar() {
  const { count } = React.useContext(CartCounterProvider);
  const { data } = useSession();
  const [open, setOpen] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);
  const [userMenuOpen, setUserMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 1024;

      setIsMobile(mobile);

      // اقفل User Dropdown لما الشاشة تصغر
      if (mobile) {
        setUserMenuOpen(false);
      }
    };

    check();

    window.addEventListener("resize", check);

    return () => window.removeEventListener("resize", check);
  }, []);
  function handleLogout() {
    signOut({ redirectTo: "/login" });
  }

  const navLinks = (
    <>
      <Link
        href="/"
        onClick={() => setOpen(false)}
        className="block py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        Home
      </Link>

      <Link
        href="/shope"
        onClick={() => setOpen(false)}
        className="block py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        Shop
      </Link>

      {/* Categories Accordion الموبايل */}
      <button
        onClick={() => setCategoriesOpen(!categoriesOpen)}
        className="flex items-center justify-between w-full py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        <span>Categories</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            categoriesOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {categoriesOpen && (
        <div className="flex flex-col">
          {categoriesNav.map((cat, i) => (
            <Link
              key={i}
              href={cat.href}
              onClick={() => setOpen(false)}
              className="block py-2 px-8 hover:bg-main-color/10 hover:text-main-color rounded-lg text-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      <Link
        href="/brands"
        onClick={() => setOpen(false)}
        className="block py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        Brands
      </Link>

      <hr className="my-2" />

      <Link
        href="/wishlist"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        <Heart className="w-5 h-5" /> Wishlist
      </Link>

      <Link
        href="/cart"
        onClick={() => setOpen(false)}
        className="flex items-center gap-2 py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        <ShoppingCart className="w-5 h-5" /> Cart
        {count > 0 && <Badge className="bg-main-color">{count}</Badge>}
      </Link>

      <hr className="my-2" />

      {data ? (
        <>
          <div className="py-3 text-sm text-gray-600">
            <Link
              className="flex items-center gap-2 py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
              href="/Profile"
            >
              
              <User size={20} /> {data?.user?.name}
            </Link>
          </div>
          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="flex items-center gap-2 py-3 px-4 w-full text-left hover:bg-red-50 hover:text-red-500 rounded-lg"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </>
      ) : (
        <div className="flex gap-2">
          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="flex grow items-center gap-2 py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
          >
            <User className="w-5 h-5" /> Sign In
          </Link>
          <Link
            href="/register"
            onClick={() => setOpen(false)}
            className="flex grow items-center gap-2 py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
          >
            <UserPlus className="w-5 h-5" /> Sign Up
          </Link>
        </div>
      )}
      <Link
        href="/contact"
        onClick={() => setOpen(false)}
        className="block py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F3FDF6]">
            <Headset className="text-main-color size-5" />
          </div>
          <div>
            <p className="text-gray-400">Need Help?</p>
            <p>Contact Support</p>
          </div>
        </div>
      </Link>
    </>
  );

  return (
    <>
      <FristNav />

      <nav className="shadow-2xl py-2 sticky inset-x-0 top-0 z-50 bg-white">
        <div className="container flex items-center justify-between gap-4">
          {/* Logo */}
          <Image src={logo} alt="Logo" />

          {/* Search */}
          <div className="relative flex-1 flex items-center">
            <Input
              className="w-full rounded-2xl border p-2 focus:outline-2 placeholder:text-[12px] outline-main-color"
              placeholder="search for product, brands and more..."
            />
            <AppButton className="absolute right-2 flex items-center justify-center rounded-full bg-main-color w-8 h-8 hover:bg-main-color/80">
              <Search className=" text-white" />
            </AppButton>
          </div>

          {/* Desktop Nav */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/">Home</Link>}
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/shope">Shop</Link>}
                />
              </NavigationMenuItem>

              {/* 🔹 Categories Dropdown الكمبيوتر */}
              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-45 p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                    {categoriesNav.map((cat, i) => (
                      <li
                        key={i}
                        className="rounded-lg hover:bg-main-color/10 hover:text-main-color transition-colors"
                      >
                        <Link
                          href={cat.href}
                          className="block py-2 px-4 text-sm font-medium"
                        >
                          {cat.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href="/brands">Brands</Link>}
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:opacity-70 border-r-3">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={
                    <Link href="/contact">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#F3FDF6]">
                          <Headset className="text-main-color size-5" />
                        </div>
                        <div>
                          <p className="text-gray-400">Support</p>
                          <p>24/7 Help</p>
                        </div>
                      </div>
                    </Link>
                  }
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={
                    <Link href="/wishlist">
                      <Heart />
                    </Link>
                  }
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={
                    <Link href="/cart" className="relative">
                      <ShoppingCart />
                      {count > 0 && (
                        <Badge className="bg-main-color absolute -top-2 left-4">
                          {count}
                        </Badge>
                      )}
                    </Link>
                  }
                />
              </NavigationMenuItem>

              {data ? (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <DropdownMenu
                          modal={false}
                          open={userMenuOpen && !isMobile}
                          onOpenChange={(value) => {
                            if (!isMobile) {
                              setUserMenuOpen(value);
                            }
                          }}
                        >
                          <DropdownMenuTrigger
                            render={
                              <button className="flex items-center justify-center p-1 rounded-full text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-colors focus:outline-none">
                                <CircleUserRound className="stroke-[1.5]" />
                              </button>
                            }
                          />

                          <DropdownMenuContent
                            className=" w-60 p-0 rounded-2xl shadow-xl border border-gray-100 bg-white overflow-hidden mt-2"
                            align="end"
                          >
                            {/* User Info */}
                            <div className="flex items-center gap-3.5 p-4">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100/80 shrink-0">
                                <CircleUserRound className="text-main-color stroke-[1.8]" />
                              </div>

                              <div className="flex flex-col min-w-0">
                                <p className="text-base font-bold text-slate-800 truncate">
                                  {data?.user?.name || "Alice Michael"}
                                </p>

                                <p className="text-xs text-slate-400 font-medium truncate">
                                  {data?.user?.email ||
                                    "mocybuparu@mailinator.com"}
                                </p>
                              </div>
                            </div>

                            <DropdownMenuSeparator className="m-0 bg-gray-100/80" />

                            {/* Links */}
                            <DropdownMenuGroup className="p-2 space-y-0.5">
                              <DropdownMenuItem
                                render={
                                  <Link
                                    href="/Profile"
                                    className="flex cursor-pointer items-center gap-3.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm"
                                  >
                                    <User className="w-5 h-5 text-slate-400 stroke-[1.7]" />
                                    <span>My Profile</span>
                                  </Link>
                                }
                              />

                              <DropdownMenuItem
                                render={
                                  <Link
                                    href="/orders"
                                    className="flex cursor-pointer items-center gap-3.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm"
                                  >
                                    <Package className="w-5 h-5 text-slate-400 stroke-[1.7]" />
                                    <span>My Orders</span>
                                  </Link>
                                }
                              />

                              <DropdownMenuItem
                                render={
                                  <Link
                                    href="/wishlist"
                                    className="flex cursor-pointer items-center gap-3.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm"
                                  >
                                    <Heart className="w-5 h-5 text-slate-400 stroke-[1.7]" />
                                    <span>My Wishlist</span>
                                  </Link>
                                }
                              />

                              <DropdownMenuItem
                                render={
                                  <Link
                                    href="/Profile/settings"
                                    className="flex cursor-pointer items-center gap-3.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm"
                                  >
                                    <Settings className="w-5 h-5 text-slate-400 stroke-[1.7]" />
                                    <span>Settings</span>
                                  </Link>
                                }
                              />
                            </DropdownMenuGroup>

                            <DropdownMenuSeparator className="m-0 bg-gray-100/80" />

                            {/* Sign Out */}
                            <div className="p-2">
                              <DropdownMenuItem
                                onClick={handleLogout}
                                className="cursor-pointer rounded-lg px-3 py-2.5 text-rose-500 hover:bg-rose-50 transition-colors flex items-center gap-3.5 font-semibold text-sm"
                              >
                                <LogOut className="w-5 h-5 text-rose-500 stroke-2" />
                                <span>Sign Out</span>
                              </DropdownMenuItem>
                            </div>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      }
                    />
                  </NavigationMenuItem>
                </>
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <Link href="/login" className="flex items-center gap-1">
                          <User /> Sign In
                        </Link>
                      }
                    />
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <Link
                          href="/register"
                          className="flex items-center gap-1"
                        >
                          <UserPlus /> Sign Up
                        </Link>
                      }
                    />
                  </NavigationMenuItem>
                </>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Mobile Hamburger + Sheet */}
          <div className="flex lg:hidden">
            <Sheet
              open={open && isMobile}
              onOpenChange={(val) => isMobile && setOpen(val)}
            >
              <SheetTrigger className="p-2 rounded-lg hover:bg-gray-100 flex lg:hidden">
                <Menu className="w-6 h-6" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72! p-4 flex flex-col gap-1 overflow-y-auto"
              >
                <div className="mb-4">
                  <Image src={logo} alt="Logo" width={100} />
                </div>
                {navLinks}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}
