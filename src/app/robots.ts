export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://www.armid.am/sitemap.xml",
    host: "https://www.armid.am",
  };
}
