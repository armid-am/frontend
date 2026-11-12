import { Donation } from "@/views/donation";
import { Metadata } from "next";
import { generatePageMetadata } from "@/shared/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return await generatePageMetadata({ params, page: "donation" });
}
export default function DonationPage() {
  return <Donation />;
}
