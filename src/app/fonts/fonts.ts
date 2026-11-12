import localFont from "next/font/local";
export const montserrat = localFont({
  src: [
    {
      path: "./montserrat/arm/Montserratarm-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./montserrat/arm/Montserratarm-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./montserrat/arm/Montserratarm-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./montserrat/arm/Montserratarm-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./montserrat/arm/Montserratarm-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./montserrat/arm/Montserratarm-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./montserrat/arm/Montserratarm-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "./montserrat/en/montserrat-latin-400-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./montserrat/en/montserrat-latin-500-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./montserrat/en/montserrat-latin-600-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./montserrat/en/montserrat-latin-700-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./montserrat/en/montserrat-latin-800-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./montserrat/en/montserrat-latin-900-normal.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "./montserrat/ru/montserrat-cyrillic-400-normal.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./montserrat/ru/montserrat-cyrillic-500-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./montserrat/ru/montserrat-cyrillic-600-normal.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./montserrat/ru/montserrat-cyrillic-700-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "./montserrat/ru/montserrat-cyrillic-800-normal.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "./montserrat/ru/montserrat-cyrillic-900-normal.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "Arial"],
  preload: true,
});
export const Bebas = localFont({
  src: [
    {
      path: "./bebas/Arm-Hmks-Bebas-Neue-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./bebas/bebasneuecyrillic.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bebas",
  display: "swap",
});
