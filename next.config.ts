import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextConfig: NextConfig = {
  // i18n: {
  //   locales: ["hy", "ru", "en"],
  //   defaultLocale: "hy",
  // },
  // Не отдавать source maps в production
  productionBrowserSourceMaps: false,
  // output: "standalone",
  // ─── Изображения ───────────────────────────────────────────
  // cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
      },
      {
        protocol: "https",
        hostname: "identity-backend.vercel.app",
      },
      { protocol: "https", hostname: "i.ytimg.com" },
    ],

    // Современные форматы
    formats: ["image/avif", "image/webp"],

    // Кэш remote images — 30 дней
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },

  // ─── Экспериментальные оптимизации ────────────────────────
  experimental: {
    optimizePackageImports: ["@phosphor-icons/react", "react-use", "swiper"],
  },

  // ─── HTTP Headers ─────────────────────────────────────────
  async headers() {
    return [
      // OG images
      {
        source: "/og.:ext(jpg|png|webp)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },

      // Next.js static assets
      // {
      //   source: "/_next/static/:path*",
      //   headers: [
      //     {
      //       key: "Cache-Control",
      //       value: "public, max-age=31536000, immutable",
      //     },
      //   ],
      // },

      // Security headers
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
