import React from "react";
import { Container, Hero, FadeInSection } from "@ui";
import "../css/donation-grid.css";
import { DonationForm } from "@/features/donation-form";
import { cn } from "@/shared/lib/cn";
import { DonorsList } from "./donors-list";
import { LiveBroadcasts } from "./live-broadcasts";
import { getDonation } from "../api/get-donation";
import { getLocale } from "next-intl/server";

export const Donation: React.FC = async () => {
  const locale = await getLocale();
  const data = await getDonation(locale);

  return (
    <div className={cn("")}>
      <Hero
        position={data?.hero?.position}
        className="mb-10"
        imgUrl={data?.hero?.image.url}
        title={data?.hero?.title}
      />
      <Container className="donation-grid mb-11 items-start">
        <DonationForm className="[grid-area:form] lg:sticky lg:top-26" />
        <FadeInSection
          threshold={0}
          className="[grid-area:text] grid gap-8 p-6 lg:p-10 shadow-[0_2px_8px_rgba(0,0,0,0.16)] rounded-[8px]"
        >
          <FadeInSection>
            <p className="font-montserat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] leading-5 tracking-[0.04em]">
              {data?.["form-text"]}
            </p>
          </FadeInSection>
          <hr />
          <LiveBroadcasts locale={locale} />
          <hr />
          <DonorsList locale={locale} />
        </FadeInSection>
      </Container>
    </div>
  );
};
