"use client";

import { ArrowRight, Flame, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const deals = [
  {
    icon: Flame,
    colorIcon: "text-red-500",
    label: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected organic fruits",
    discount: "40% OFF",
    code: "ORGANIC40",
    button: "Shop Now",
    gradient: "from-emerald-500 to-emerald-700",
    iconBg: "bg-white/20",
    buttonText: "text-emerald-600",
  },
  {
    icon: Sparkles,
    colorIcon: "text-yellow-500",
    label: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables",
    discount: "25% OFF",
    code: "FRESH25",
    button: "Explore Now",
    gradient: "from-orange-500 to-rose-500",
    iconBg: "bg-white/20",
    buttonText: "text-orange-600",
  },
];

export default function DealsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-6 overflow-hidden">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {deals.map((deal, index) => {
            const Icon = deal.icon;

            return (
              <div
                key={index}
                className={`
                  relative overflow-hidden rounded-2xl
                  bg-linear-to-br ${deal.gradient}
                  p-6 md:p-7 text-white

                  transition-transform duration-700 ease-out

                  ${
                    show
                      ? "translate-x-0 opacity-100"
                      : index === 0
                      ? "-translate-x-30 opacity-0"
                      : "translate-x-30 opacity-0"
                  }
                `}
              >
                {/* الدائرة اللي فوق على اليمين */}
                <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-white/10" />

                {/* الدائرة اللي تحت على الشمال */}
                <div className="absolute -bottom-16 -left-16 w-36 h-36 rounded-full bg-white/10" />

                <div className="relative z-10 max-w-lg">
                  {/* Label */}
                  <div
                    className={`inline-flex items-center gap-1.5 ${deal.iconBg} rounded-full px-3.5 py-1.5 mb-4`}
                  >
                    <Icon className={deal.colorIcon} size={16} />

                    <span className="text-sm font-medium">
                      {deal.label}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-extrabold leading-tight mb-2">
                    {deal.title}
                  </h2>

                  {/* Description */}
                  <p className="text-sm md:text-base mb-5 opacity-90">
                    {deal.description}
                  </p>

                  {/* Discount */}
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-2xl md:text-3xl font-extrabold">
                      {deal.discount}
                    </span>

                    <span className="text-sm">
                      Use code:{" "}
                      <strong className="font-extrabold">
                        {deal.code}
                      </strong>
                    </span>
                  </div>

                  {/* Button */}
                  <Link
                    href="/shope"
                    className={`bg-white ${deal.buttonText} w-fit rounded-full px-6 py-2.5 text-sm md:text-base font-semibold flex items-center gap-2 hover:opacity-95 transition-opacity`}
                  >
                    <span>{deal.button}</span>

                    <ArrowRight size={18} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}