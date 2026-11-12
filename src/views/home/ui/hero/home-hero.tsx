import { FadeInSection } from "@ui";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { HeroBgVideo } from "./hero-bg-video";
import { HeroButton } from "./hero-button";

interface Props {
  className?: string;
  data: any;
}

export const HomeHero: React.FC<Props> = (props) => {
  const { className, data } = props;

  return (
    <section className={cn("mb-16 md:mb-[9%]", className)}>
      <FadeInSection
        threshold={0}
        className={cn(
          `relative header-img translate-y-0! rounded-[0_0_50vw_50vw/26vw] min-[480px]:rounded-[0_0_50vw_50vw/16vw] overflow-hidden backdrop-blur-[2px] mx-auto flex flex-col`,
        )}
      >
        <HeroBgVideo />
        {data?.title && (
          <FadeInSection className="absolute inset-0 flex flex-col items-center justify-center gap-6">
            <h2 className="font-bebas text-[clamp(1.875rem,1.1667rem+3.1481vw,4rem)] text-white leading-[120%] text-center">
              {data?.title?.includes("/") ? (
                <>
                  {data?.title.split("/")[0]}
                  <br />
                  {data?.title.split("/")[1]}
                </>
              ) : (
                data?.title
              )}
            </h2>
            <HeroButton data={data?.videoModal} />
          </FadeInSection>
        )}
      </FadeInSection>
    </section>
  );
};
