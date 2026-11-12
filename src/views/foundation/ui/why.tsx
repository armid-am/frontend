import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "@ui";

interface Props {
  className?: string;
  textStyle?: string;
  text1Style: string;
  text2Style: string;
  number: string;
  text?: string;
  text1: string;
  text2: string;
  numberClassName?: string;
}

export const Why: React.FC<Props> = (props) => {
  const {
    className,
    text,
    text1,
    text2,
    textStyle,
    text1Style,
    text2Style,
    number,
  } = props;

  return (
    <div className={cn("flex flex-col gap-4 justify-start", className)}>
      <FadeInSection threshold={0.1} className="grid">
        <div className={cn("relative flex items-center h-auto")}>
          <span className="text-[114px] min-[576px]:text-[144px] w-18 min-[576px]:w-[104px] text-center -mr-[40px] text-[rgb(120,18,20,0.12)] leading-[122px] font-black font-montserat-en">
            {number}
          </span>
          <div className="grid gap-1 sm:gap-2">
            <span className={cn("font-montserat", text1Style)}>{text1}</span>
            <span className={cn("tracking-[0.05em] font-bebas", text2Style)}>
              {text2}
            </span>
          </div>
        </div>
      </FadeInSection>

      {text && (
        <FadeInSection threshold={0.1}>
          <p
            className={cn(
              "text-base font-semibold text-[#404040] tracking-[-0.02em] font-montserat text-[18px] text-start",
              textStyle,
            )}
          >
            {text}
          </p>
        </FadeInSection>
      )}
    </div>
  );
};
