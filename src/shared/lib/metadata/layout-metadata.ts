import { Metadata } from "next";
const baseUrl = "https://armid.am";
export const layoutMetadata: Metadata = {
  // metadataBase: new URL(baseUrl),
  title: {
    default: "armid.am",
    template: "%s | armid.am",
  },
  description: "IDENTITY",
  icons: {
    shortcut: "/favicon.ico",
  },
  // alternates: {
  //   canonical: baseUrl + "/hy",
  //   languages: {
  //     ru: baseUrl + "/ru",
  //     en: baseUrl + "/en",
  //     hy: baseUrl + "/hy",
  //     "x-default": "/",
  //   },
  // },
  keywords: [
    "armid.am",
    "identity",
    "armid",
    "identity.am",
    "идентичность",
    "ինքնություն",
  ],
  openGraph: {
    // title: "armid.am",
    // description: "IDENTITY",
    url: `${baseUrl}`,
    siteName: "armid.am",
    type: "website",

    images: [
      {
        url: `${baseUrl}/og.jpg`,
        secureUrl: `${baseUrl}/og.jpg`,
        width: 1800,
        height: 945,
        type: "image/jpeg",
        alt: "armid.am preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "armid.am",
    description: "IDENTITY",
    images: [`${baseUrl}/og.jpg`],
  },
};
