"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  CircleUserRound,
  Headset,
  Heart,
  LogOut,
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
// ملاحظة: اسم الفولدر لسه FristNav، لو غيرته لـ FirstNav عدّل المسار هنا بس
import FirstNav from "../FristNav/FristNav";
// ملاحظة: الاسم الأصلي CartCounterProvider بس هو في الحقيقة Context، فعملنا له alias
import { CartCounterProvider as CartCounterContext } from "@/Context/CartCound/CartCound";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

/* ------------------------------------------------------------------ */
/* Constants                                                           */
/* ------------------------------------------------------------------ */

// الـ routes في مكان واحد: لو غيّرت /shop لـ /shop غيّرها هنا بس (وغيّر اسم الفولدر)
const ROUTES = {
  home: "/",
  shop: "/shop",
  brands: "/brands",
  wishlist: "/wishlist",
  cart: "/cart",
  contact: "/contact",
  login: "/login",
  register: "/register",
  profile: "/Profile",
  orders: "/orders",
  settings: "/Profile/settings",
} as const;

const categoriesNav = [
  { name: "All categories", href: "/categorise" },
  { name: "Electronics", href: "/categorise/6439d2d167d9aa4ca970649f" },
  { name: "Women's Fashion", href: "/categorise/6439d58a0049ad0b52b9003f" },
  { name: "Men's Fashion", href: "/categorise/6439d5b90049ad0b52b90048" },
  { name: "Beauty & Health", href: "/categorise/6439d30b67d9aa4ca97064b1" },
];

const userLinks = [
  { href: ROUTES.profile, label: "My Profile", icon: User },
  { href: ROUTES.orders, label: "My Orders", icon: Package },
  { href: ROUTES.wishlist, label: "My Wishlist", icon: Heart },
  { href: ROUTES.settings, label: "Settings", icon: Settings },
];

const mobileLinkClass =
  "block py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg";
const mobileIconLinkClass =
  "flex items-center gap-2 py-3 px-4 hover:bg-main-color/10 hover:text-main-color rounded-lg";
const dropdownLinkClass =
  "flex cursor-pointer items-center gap-3.5 px-3 py-2.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors font-medium text-sm";

/* ------------------------------------------------------------------ */
/* SearchBar                                                           */
/* ------------------------------------------------------------------ */

function SearchBar({
  className = "",
  onSearched,
}: {
  className?: string;
  onSearched?: () => void;
}) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = String(formData.get("search") ?? "").trim();
    if (!query) return;

    router.push(`${ROUTES.shop}?search=${encodeURIComponent(query)}`);
    onSearched?.();
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`relative flex-1 items-center ${className}`}
    >
      <Input
        name="search"
        aria-label="Search products"
        className="w-full rounded-2xl border p-2 pe-12 focus:outline-2 placeholder:text-[12px] outline-main-color"
        placeholder="search for product, brands and more..."
      />
      <AppButton
        type="submit"
        aria-label="Search"
        className="absolute right-2 flex items-center justify-center rounded-full bg-main-color w-8 h-8 hover:bg-main-color/80"
      >
        <Search className="text-white" />
      </AppButton>
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Navbar                                                              */
/* ------------------------------------------------------------------ */

export default function Navbar() {
  const { count } = React.useContext(CartCounterContext);
  const { data } = useSession();
  const [open, setOpen] = React.useState(false);
  const [categoriesOpen, setCategoriesOpen] = React.useState(false);

  // اقفل الـ Sheet لو الشاشة كبرت لحجم ديسكتوب (من غير ما نعتمد على state في الـ render)
  React.useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", handleChange);
    return () => mq.removeEventListener("change", handleChange);
  }, []);

  function handleLogout() {
    signOut({ redirectTo: ROUTES.login });
  }

  const closeSheet = () => setOpen(false);

  const navLinks = (
    <>
      <SearchBar className="flex my-2" onSearched={closeSheet} />

      <Link href={ROUTES.home} onClick={closeSheet} className={mobileLinkClass}>
        Home
      </Link>

      <Link href={ROUTES.shop} onClick={closeSheet} className={mobileLinkClass}>
        Shop
      </Link>

      {/* Categories Accordion للموبايل */}
      <button
        type="button"
        aria-expanded={categoriesOpen}
        aria-controls="mobile-categories"
        onClick={() => setCategoriesOpen((prev) => !prev)}
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
        <div id="mobile-categories" className="flex flex-col">
          {categoriesNav.map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              onClick={closeSheet}
              className="block py-2 px-8 hover:bg-main-color/10 hover:text-main-color rounded-lg text-sm"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      <Link href={ROUTES.brands} onClick={closeSheet} className={mobileLinkClass}>
        Brands
      </Link>

      <hr className="my-2" />

      <Link
        href={ROUTES.wishlist}
        onClick={closeSheet}
        className={mobileIconLinkClass}
      >
        <Heart className="w-5 h-5" /> Wishlist
      </Link>

      <Link
        href={ROUTES.cart}
        onClick={closeSheet}
        className={mobileIconLinkClass}
      >
        <ShoppingCart className="w-5 h-5" /> Cart
        {count > 0 && <Badge className="bg-main-color">{count}</Badge>}
      </Link>

      <hr className="my-2" />

      {data ? (
        <>
          <div className="py-3 text-sm text-gray-600">
            <Link
              className={mobileIconLinkClass}
              href={ROUTES.profile}
              onClick={closeSheet}
            >
              <User size={20} /> {data?.user?.name}
            </Link>
          </div>
          <button
            type="button"
            onClick={() => {
              handleLogout();
              closeSheet();
            }}
            className="flex items-center gap-2 py-3 px-4 w-full text-left hover:bg-red-50 hover:text-red-500 rounded-lg"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </>
      ) : (
        <div className="flex gap-2">
          <Link
            href={ROUTES.login}
            onClick={closeSheet}
            className={`grow ${mobileIconLinkClass}`}
          >
            <User className="w-5 h-5" /> Sign In
          </Link>
          <Link
            href={ROUTES.register}
            onClick={closeSheet}
            className={`grow ${mobileIconLinkClass}`}
          >
            <UserPlus className="w-5 h-5" /> Sign Up
          </Link>
        </div>
      )}

      <Link href={ROUTES.contact} onClick={closeSheet} className={mobileLinkClass}>
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
      <FirstNav />

      <nav className="shadow-2xl py-2 sticky inset-x-0 top-0 z-50 bg-white">
        <div className="container flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href={ROUTES.home} aria-label="Go to home page">
            <Image src={logo} alt="Logo" priority />
          </Link>

          {/* Search (md وأكبر) */}
          <SearchBar className="hidden md:flex" />

          {/* Desktop Nav */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="gap-1">
              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href={ROUTES.home}>Home</Link>}
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={<Link href={ROUTES.shop}>Shop</Link>}
                />
              </NavigationMenuItem>

              {/* Categories Dropdown للكمبيوتر */}
              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="min-w-45 p-2 bg-white rounded-xl shadow-lg border border-gray-100">
                    {categoriesNav.map((cat) => (
                      <li
                        key={cat.href}
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
                  render={<Link href={ROUTES.brands}>Brands</Link>}
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:opacity-70 border-r-3">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={
                    <Link href={ROUTES.contact}>
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
                    <Link href={ROUTES.wishlist} aria-label="Wishlist">
                      <Heart />
                    </Link>
                  }
                />
              </NavigationMenuItem>

              <NavigationMenuItem className="hover:text-main-color">
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  render={
                    <Link
                      href={ROUTES.cart}
                      className="relative"
                      aria-label={
                        count > 0 ? `Cart, ${count} items` : "Cart"
                      }
                    >
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
                <NavigationMenuItem>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    render={
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger
                          render={
                            <button
                              type="button"
                              aria-label="User menu"
                              className="flex items-center justify-center p-1 rounded-full text-slate-700 hover:text-emerald-600 hover:bg-slate-100 transition-colors focus:outline-none"
                            >
                              <CircleUserRound className="stroke-[1.5]" />
                            </button>
                          }
                        />

                        <DropdownMenuContent
                          className="w-60 p-0 rounded-2xl shadow-xl border border-gray-100 bg-white overflow-hidden mt-2"
                          align="end"
                        >
                          {/* User Info */}
                          <div className="flex items-center gap-3.5 p-4">
                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100/80 shrink-0">
                              <CircleUserRound className="text-main-color stroke-[1.8]" />
                            </div>

                            <div className="flex flex-col min-w-0">
                              <p className="text-base font-bold text-slate-800 truncate">
                                {data?.user?.name || "User"}
                              </p>
                              {data?.user?.email && (
                                <p className="text-xs text-slate-400 font-medium truncate">
                                  {data.user.email}
                                </p>
                              )}
                            </div>
                          </div>

                          <DropdownMenuSeparator className="m-0 bg-gray-100/80" />

                          {/* Links */}
                          <DropdownMenuGroup className="p-2 space-y-0.5">
                            {userLinks.map(({ href, label, icon: Icon }) => (
                              <DropdownMenuItem
                                key={href}
                                render={
                                  <Link href={href} className={dropdownLinkClass}>
                                    <Icon className="w-5 h-5 text-slate-400 stroke-[1.7]" />
                                    <span>{label}</span>
                                  </Link>
                                }
                              />
                            ))}
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
              ) : (
                <>
                  <NavigationMenuItem>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                      render={
                        <Link
                          href={ROUTES.login}
                          className="flex items-center gap-1"
                        >
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
                          href={ROUTES.register}
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

          {/* Mobile: Wishlist + Cart + Hamburger Sheet */}
          <div className="flex lg:hidden">
            <div className="flex items-center justify-center">
              <Link
                href={ROUTES.wishlist}
                aria-label="Wishlist"
                className={mobileIconLinkClass}
              >
                <Heart size={20} />
              </Link>
              <Link
                href={ROUTES.cart}
                aria-label={count > 0 ? `Cart, ${count} items` : "Cart"}
                className={`${mobileLinkClass} relative`}
              >
                <ShoppingCart size={20} />
                {count > 0 && (
                  <Badge className="bg-main-color absolute -top-1 right-1">
                    {count}
                  </Badge>
                )}
              </Link>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                aria-label="Open menu"
                className="w-10 h-10 rounded-full bg-main-color hover:bg-main-color/70 flex justify-center items-center lg:hidden"
              >
                <Menu className="w-6 h-6 text-white" />
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-72! p-4 flex flex-col gap-1 overflow-y-auto"
              >
                <div className="mb-4">
                  <Link href={ROUTES.home} onClick={closeSheet}>
                    <Image src={logo} alt="Logo" width={100} />
                  </Link>
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