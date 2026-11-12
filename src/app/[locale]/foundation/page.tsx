import { Foundation } from "@/views/foundation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/shared/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return await generatePageMetadata({ params, page: "foundation" });
}

export default function FoundationPage() {
  return <Foundation />;
}
