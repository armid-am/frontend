import { cn } from "@/shared/lib/cn";
import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

export const Container: React.FC<Props> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "min-[1440px]:mx-auto! md:mx-[clamp(2.5rem,-0.8333rem+6.9444vw,7.5rem)] min-[1440px]:px-4! max-w-368 max-[1440px]:max-w-308 max-[1280px]:max-w-6xl max-[800px]:max-w-188 max-[360px]:max-w-90 px-4 md:px-0",
        className,
      )}
    >
      {children}
    </div>
  );
};
