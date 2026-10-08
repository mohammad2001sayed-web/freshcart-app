"use client";

import Image from "next/image";
import Link from "next/link";

import imgFooter from "@/assets/logo.svg";
import { Mail, MapPin, Phone } from "lucide-react";
import ServiceFeatures from "../ServiceFeatures/ServiceFeatures";

// =======================
// Footer Column
// =======================

interface FooterLink {
  name: string;
  href: string;
}

interface FooterColumnProps {
  title: string;
  links: FooterLink[];
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div>
      <h3 className="mb-4 text-base font-semibold text-white">{title}</h3>

      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-main-color"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// =======================
// Social Button
// =======================

function SocialButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1e293b] text-gray-400 transition-all duration-200 hover:bg-[#334155] hover:text-white"
    >
      {children}
    </Link>
  );
}

// =======================
// Footer
// =======================

export default function Footer() {
  return (
    <>
    <ServiceFeatures variant="footer" />
    <footer className="bg-[#0b132a] text-white">
      {/* ================= TOP FOOTER ================= */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-6 lg:gap-8">
          {/* ================= BRAND ================= */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <div className="flex h-12 w-fit items-center rounded-lg bg-white px-4">
                <Image
                  src={imgFooter}
                  alt="FreshCart"
                  width={120}
                  height={40}
                  className="h-auto w-30"
                />
              </div>
            </Link>

            {/* Description */}
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-400">
              FreshCart is your one-stop destination for quality products. From
              fashion to electronics, we bring you the best brands at
              competitive prices with a seamless shopping experience.
            </p>

            {/* Contact Information */}
            <div className="mt-6 space-y-3.5 text-sm text-gray-400">
              {/* Phone */}
              <Link
                href="tel:+18001234567"
                className="flex items-center gap-3 transition-colors hover:text-main-color"
              >
                <Phone size={17} color="#22C55E" />
                <span>+1 (800) 123-4567</span>
              </Link>

              {/* Email */}
              <Link
                href="mailto:support@freshcart.com"
                className="flex items-center gap-3 transition-colors hover:text-main-color"
              >
                <Mail size={17} color="#22C55E" />
                <span>support@freshcart.com</span>
              </Link>

              {/* Address */}
              <Link
                href="https://maps.google.com/?q=123+Commerce+Street,+New+York,+NY+10001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 transition-colors hover:text-main-color"
              >
                <MapPin size={17} color="#22C55E" />
                <span>123 Commerce Street, New York, NY 10001</span>
              </Link>
            </div>

            {/* Social Media */}
            <div className="mt-7 flex gap-3">
              {/* Facebook */}
              <SocialButton href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialButton>

              {/* Twitter */}
              <SocialButton href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                </svg>
              </SocialButton>

              {/* Instagram */}
              <SocialButton href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </SocialButton>

              {/* YouTube */}
              <SocialButton href="#">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                  <polygon
                    points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
                    fill="#1e293b"
                  />
                </svg>
              </SocialButton>
            </div>
          </div>

          {/* ================= SHOP ================= */}
          <FooterColumn
            title="Shop"
            links={[
              { name: "All Products", href: "/shope" },
              { name: "Categories", href: "/categorise" },
              { name: "Brands", href: "/brands" },
              { name: "Electronics", href: "/categorise/6439d2d167d9aa4ca970649f" },
              { name: "Men's Fashion", href: "/categorise/6439d5b90049ad0b52b90048" },
              { name: "Women's Fashion", href: "/categorise/6439d58a0049ad0b52b9003f" },
            ]}
          />

          {/* ================= ACCOUNT ================= */}
          <FooterColumn
            title="Account"
            links={[
              { name: "My Account", href: "/Profile" },
              { name: "Order History", href: "/orders" },
              { name: "Wishlist", href: "/wishlist" },
              { name: "Shopping Cart", href: "/cart" },
              { name: "Sign In", href: "/login" },
              { name: "Create Account", href: "/register" },
            ]}
          />

          {/* ================= SUPPORT ================= */}
          <FooterColumn
            title="Support"
            links={[
              { name: "Contact Us", href: "/contact" },
              { name: "Help Center", href: "/help" },
              { name: "Shipping Info", href: "/shipping" },
              { name: "Returns & Refunds", href: "/returns" },
              { name: "Track Order", href: "/track-order" },
            ]}
          />

          {/* ================= LEGAL ================= */}
          <FooterColumn
            title="Legal"
            links={[
              { name: "Privacy Policy", href: "/privacy-policy" },
              { name: "Terms of Service", href: "/terms" },
              { name: "Cookie Policy", href: "/cookie-policy" },
            ]}
          />
        </div>
      </div>

      {/* ================= BOTTOM FOOTER ================= */}
      <div className="border-t pb-20 md:pb-0 border-[#192338]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-8">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2026 FreshCart. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>Visa</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>Mastercard</span>
            </div>

            <div className="flex items-center gap-1.5">
              <svg
                className="h-4 w-4 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <line x1="2" x2="22" y1="10" y2="10" />
              </svg>
              <span>PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
