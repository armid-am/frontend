import "../globals.css";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { Providers } from "@/shared/ui/providers";
import { Bebas, montserrat } from "../fonts/fonts";
import { Metadata, Viewport } from "next";
import { routing } from "@/i18n/routing";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { LayoutTitle } from "@/shared/ui/layout-title";
import { layoutMetadata } from "@/shared/lib/metadata";
import { MenuShareLinks } from "@/entities/share-link";

export const viewport: Viewport = {
  colorScheme: "light",
};
export const metadata: Metadata = layoutMetadata;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} data-scroll-behavior="smooth">
      <body className={`${montserrat.className} ${Bebas.variable}`}>
        <LayoutTitle />
        <Providers locale={locale}>
          <Header />
          <main>{children}</main>
          <Footer />
          <MenuShareLinks />
        </Providers>
      </body>
    </html>
  );
}
