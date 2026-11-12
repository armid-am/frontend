import { Home } from "@/views/home";
import { Metadata } from "next";
import { generatePageMetadata } from "@/shared/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return await generatePageMetadata({ params, page: "" });
}

export default function HomePage() {
  return <Home />;
}
