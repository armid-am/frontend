"use client";
import React from "react";
import { Title } from "@ui";
import { HeroLinks } from "./hero-links";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "../fade-in-section";
import Image from "next/image";

// Simple spinner component
const Spinner = () => (
  <div className="absolute inset-0 flex items-center h-full w-full justify-center bg-gray-200 bg-opacity-40 z-10">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-white"></div>
  </div>
);

interface Props {
  className?: string;
  imgUrl?: string;
  title?: string;
  isLoading?: boolean;
  position?: string;
}

export const Hero: React.FC<Props> = (props) => {
  const { imgUrl, title, isLoading, className, position } = props;
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (!imgUrl) {
      setLoading(false);
      return;
    }
    const img = new window.Image();
    img.src = imgUrl;
    img.onload = () => setLoading(false);
    img.onerror = () => setLoading(false);
  }, [imgUrl]);

  return (
    <section>
      <FadeInSection
        className={cn(
          "flex flex-col translate-y-0! bg-cover h-[clamp(10rem,8.8462rem+5.1282vw,15rem)] bg-center bg-no-repeat relative",
          {
            hero: !isLoading && !loading && imgUrl,
          },
          className,
        )}
      >
        <Image
          fill
          fetchPriority="high"
          loading="eager"
          className={cn("absolute inset-0 object-cover w-full h-full", {
            "object-left": position === "left",
            "object-center": position === "center",
            "object-right": position === "right",
            "object-bottom": position === "bottom",
            "object-top": position === "top",
          })}
          src={imgUrl as string}
          alt=""
        />
        {loading || (isLoading && <Spinner />)}
        {!isLoading && !loading && (
          <div className="max-w-350 min-[640px]:pl-10 min-[1440px]:pl-0 w-full relative z-2 justify-center sm:justify-normal mt-auto grid mx-auto px-4 pb-10 items-center">
            {title && (
              <>
                <FadeInSection>
                  <Title
                    className="font-bebas mb-4 leading-[125%] text-white text-center sm:text-left"
                    size={"n"}
                    text={title as string}
                  />
                </FadeInSection>
                <FadeInSection>
                  <HeroLinks text={title} />
                </FadeInSection>
              </>
            )}
          </div>
        )}
      </FadeInSection>
    </section>
  );
};
// import Image from "next/image";
// import { HeroLinks } from "./hero-links";
// import { Title } from "./ui";
// import { FadeInSection } from "./fade-in-section";
// import { cn } from "@/lib/utils";

// interface Props {
//   imgUrl?: string;
//   title?: string;
//   position?: string;
//   className?: string;
// }

// export function Hero({ imgUrl, title, position, className }: Props) {
//   return (
//     <section>
//       <div
//         className={cn(
//           "relative flex flex-col h-[clamp(10rem,8.8462rem+5.1282vw,15rem)] overflow-hidden",
//           className,
//         )}
//       >
//         {imgUrl && (
//           <Image
//             src={imgUrl}
//             alt={title ?? ""}
//             fill
//             priority
//             sizes="100vw"
//             className={cn("object-cover", {
//               "object-left": position === "left",
//               "object-center": position === "center",
//               "object-right": position === "right",
//               "object-top": position === "top",
//               "object-bottom": position === "bottom",
//             })}
//           />
//         )}

//         <div className="absolute inset-0 bg-black/30 z-9" />

//         <div className="relative z-10 mt-auto mx-auto max-w-350 w-full px-4 pb-10">
//           {title && (
//             <>
//               <FadeInSection>
//                 <Title
//                   text={title}
//                   size="n"
//                   className="font-bebas mb-4 text-white"
//                 />
//               </FadeInSection>

//               <FadeInSection>
//                 <HeroLinks text={title} />
//               </FadeInSection>
//             </>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// }
