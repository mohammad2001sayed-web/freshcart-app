import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Safety net: default is 60s. Raises the ceiling in case any page
  // still gets prerendered and the external API responds slowly.
  staticPageGenerationTimeout: 120,
  // أي رابط deployment خاص (freshcart-xxxx-mohamed-7e77.vercel.app) بيتحوّل
  // للدومين الثابت، لأن جوجل مسجّل عنده الدومين الثابت بس لتسجيل الدخول.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "freshcart-.*-mohamed-7e77\\.vercel\\.app",
          },
        ],
        destination: "https://freshcart-app-black.vercel.app/:path*",
        permanent: false,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/Route-Academy-products/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/Route-Academy-categories/**",
      },
      {
        protocol: "https",
        hostname: "ecommerce.routemisr.com",

        pathname: "/Route-Academy-brands/**",
      },
    ],
  },
};

export default nextConfig;