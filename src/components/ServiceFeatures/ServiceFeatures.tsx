import {
  Truck,
  RotateCcw,
  ShieldCheck,
  Headset,
  type LucideIcon,
} from "lucide-react";

type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
};

type ServiceFeaturesProps = {
  variant?: "home" | "footer";
};

const features: Feature[] = [
  {
    title: "Free Shipping",
    description: "On orders over 500 EGP",
    icon: Truck,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
  },
  {
    title: "Easy Returns",
    description: "14-day return policy",
    icon: RotateCcw,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
  },
  {
    title: "Secure Payment",
    description: "100% secure checkout",
    icon: ShieldCheck,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
  },
  {
    title: "24/7 Support",
    description: "Contact us anytime",
    icon: Headset,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
  },
];

export default function ServiceFeatures({
  variant = "home",
}: ServiceFeaturesProps) {
  return (
    <div className="container">
      <section
        className={
          variant === "home" ? "  my-1" : "bg-green-50 py-8"
        }
      >
        <div
          className={
            variant === "home"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
              : "container mx-auto grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4"
          }
        >
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className={
                  variant === "home"
                    ? "flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm"
                    : "flex items-center gap-4"
                }
              >
                {/* Icon */}
                <div
                  className={`
                  flex shrink-0 items-center justify-center rounded-2xl
                  ${variant === "home" ? "size-10" : "size-12"}
                  ${variant === "home" ? feature.iconBg : "bg-[#DCFCE7]"}
                `}
                >
                  <Icon
                    className={`
                    ${feature.iconColor}
                    ${variant === "home" ? "size-5" : "size-7  text-main-color!"}
                  `}
                    strokeWidth={2.5}
                  />
                </div>

                {/* Content */}
                <div>
                  <h3
                    className={
                      variant === "home"
                        ? "text-sm font-semibold text-gray-900"
                        : "text-lg font-semibold text-gray-900"
                    }
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={
                      variant === "home"
                        ? "text-xs text-gray-500"
                        : "text-sm text-gray-500"
                    }
                  >
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
