import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection, Title } from "@ui";
import { VideoCard } from "@/entities/video-card";
import { GalleryImages } from "./gallery-images";

interface Props {
  className?: string;
  data: any;
}

export const ContentBlocks: React.FC<Props> = (props) => {
  const { className, data } = props;
  return (
    <article
      className={cn(
        "flex flex-col gap-4 max-w-177 w-full mx-auto bg-white overflow-hidden",
        className,
      )}
    >
      {data?.posts?.map((item: any) => (
        <div key={item.id}>
          {item?.text && (
            <FadeInSection threshold={0.1}>
              <p className="font-montserrat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] md:text-base leading-4 md:leading-6">
                {item.text}
              </p>
            </FadeInSection>
          )}
          {item?.title && (
            <FadeInSection threshold={0.1}>
              <Title size="p" text={item.title} />
            </FadeInSection>
          )}
          {item?.images?.length > 0 && <GalleryImages images={item.images} />}
          {item?.url && (
            <VideoCard
              className="shrink-0"
              iframeBoxClassName="rounded-3xl"
              videoUrl={item.url}
            />
          )}
          {item?.quote && (
            <FadeInSection
              threshold={0.1}
              className="flex justify-center items-center h-fit"
            >
              <span className="text-[72px] leading-16 md:text-[144px] md:leading-30.5 -mr-6 md:-mr-10 font-montserat-en font-black text-[rgba(120,18,20,0.12)]">
                “
              </span>
              <blockquote className="relative z-50 uppercase py-2 md:py-6 font-montserat text-[16px] max-w-165.5 sm:text-[24px] tracking-[00.03em] text-[#1E1E1E] font-semibold text-center leading-6 md:leading-[150%]">
                {item.quote}
              </blockquote>
            </FadeInSection>
          )}
        </div>
      ))}
    </article>
  );
};
