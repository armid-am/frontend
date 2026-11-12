import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection, Title } from "@ui";
import { ActiveSectionWrapper } from "./active-section-wrapper";
import { AnimationLogo } from "./animation-logo";

interface Props {
  className?: string;
  data: any;
}

export const AboutUs: React.FC<Props> = async (props) => {
  const { className, data: aboutData } = props;
  const data = aboutData?.about;

  return (
    <ActiveSectionWrapper
      treshhold={1}
      sectionName={
        aboutData["categories-links"]["category-links-title"][0].name
      }
      className={cn("w-full flex flex-col gap-8 md:gap-12", className)}
    >
      <FadeInSection>
        <AnimationLogo />
      </FadeInSection>
      <FadeInSection>
        <Title size="f" text={data?.title} />
        <hr className="mb-4" />
        <p className="font-montserat text-[clamp(0.875rem,0.8036rem+0.3571vw,1.125rem)] leading-[136%] -tracking-[0.02em] text-[#424242]">
          {data?.description}
        </p>
      </FadeInSection>
    </ActiveSectionWrapper>
  );
};
