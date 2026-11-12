import "swiper/css";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { Container, Title, FadeInSection } from "@ui";
import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@ui";

interface Props {
  className?: string;
  data: any;
}

export const LogoSlider: React.FC<Props> = (props) => {
  const { className, data } = props;

  return (
    <section
      className={cn("mb-[clamp(2.5rem,1.3462rem+5.1282vw,7.5rem)]", className)}
    >
      <Container
        className={cn(
          "md:mx-0 mx-0 px-0 xl:mx-auto xl:max-w-360 w-full max-w-full",
          className,
        )}
      >
        <FadeInSection>
          <Title
            className="mb-4 ml-4 min-[1440px]:ml-0 border-0"
            size="f"
            text={data.title}
          />
        </FadeInSection>
        <div className="overflow-x-auto w-full [scrollbar-width:none]">
          <FadeInSection>
            <div className="pt-6 pb-6 flex items-center justify-center">
              <Marquee>
                <MarqueeFade side="left" />
                <MarqueeContent speed={40}>
                  {data.logoSlider.map((color: any, i: number) => (
                    <MarqueeItem key={i} className="mx-3">
                      <img
                        src={color["logo-image"]?.url}
                        alt={""}
                        className="mx-6 md:mx-8 h-12 md:h-16 py-1 w-auto"
                      />
                    </MarqueeItem>
                  ))}
                </MarqueeContent>
                <MarqueeFade side="right" />
              </Marquee>
            </div>
          </FadeInSection>
        </div>
      </Container>
    </section>
  );
};
