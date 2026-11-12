import { Gallery } from "@/views/gallery";
import { Metadata } from "next";
import { generatePageMetadata } from "@/shared/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return await generatePageMetadata({ params, page: "gallery" });
}

export default async function GalleryPage() {
  return <Gallery />;
}
