import React from "react";
import { cn } from "@/shared/lib/cn";
import { Title, FadeInSection } from "@ui";
import { Why } from "./why";
import Image from "next/image";
import { ActiveSectionWrapper } from "./active-section-wrapper";
interface Props {
  className?: string;
  data: any;
}

export const Project: React.FC<Props> = (props) => {
  const { className, data: projectData } = props;
  const data = projectData?.project;
  return (
    <ActiveSectionWrapper
      treshhold={0.3}
      sectionName={
        projectData["categories-links"]["category-links-title"][1].name
      }
      className={cn("flex flex-col text-start", className)}
    >
      <FadeInSection>
        <Title className="mb-4" size="f" text={data?.title} />
      </FadeInSection>
      <div className="mb-8">
        <FadeInSection>
          <p className="text-[16px] uppercase text-primary md:text-[24px] -tracking-[0.02em] font-montserat font-semibold leading-[120%]">
            {data?.["first-text"]}
          </p>
        </FadeInSection>
        <FadeInSection>
          <p className="text-[16px] uppercase md:text-[24px] font-montserat tracking-[0.02em] font-semibold leading-[120%]">
            {data?.["second-text"]}
          </p>
        </FadeInSection>
      </div>

      <FadeInSection className="mb-8">
        <div className="rounded-3xl overflow-hidden">
          <Image
            width={918}
            height={509}
            className="w-full"
            src={data?.image?.url}
            alt="project"
          />
        </div>
      </FadeInSection>

      <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-21.25">
        {data?.posts?.map((item: any, index: number) => (
          <Why
            key={index}
            textStyle="text-[clamp(0.875rem,0.8036rem+0.3571vw,1.125rem)] leading-[136%] -tracking-[0.02em] text-[#424242]"
            text1Style="text-[clamp(1.125rem,0.875rem+1.25vw,2rem)] text-[#404040] leading-[160%] font-montserat font-bold "
            text2Style="text-primary text-[clamp(2rem,1.5385rem+2.0513vw,4rem)] leading-[100%]"
            number={(index + 1).toString()}
            text={item.text}
            text1={item["before-title"]}
            text2={item.title}
          />
        ))}
      </div>

      <FadeInSection className="flex justify-center">
        <span className="text-[72px] leading-16 md:text-[144px] md:leading-30.5 -mr-6 md:-mr-10 font-montserat-en font-black text-[rgba(120,18,20,0.12)]">
          “
        </span>
        <p className="relative z-50 uppercase py-2 md:py-6 font-montserat text-[16px] max-w-165.5 sm:text-[24px] tracking-[00.03em] text-[#1E1E1E] font-semibold text-center leading-6 md:leading-8">
          {data?.["fourth-text"]}
        </p>
      </FadeInSection>
    </ActiveSectionWrapper>
  );
};
