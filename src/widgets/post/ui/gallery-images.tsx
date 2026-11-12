"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { ImageSelected } from "./image-selected";
import Image from "next/image";
import { FadeInSection } from "@ui";
import { useInView } from "react-intersection-observer";

interface Props {
  className?: string;
  images: any[];
}

export const GalleryImages: React.FC<Props> = (props) => {
  const { className, images } = props;
  const [selected, setSelected] = React.useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "grid grid-cols-2 grid-rows-2 gap-2 sm:gap-4",
        {
          "[grid-template-areas:'img-0_img-1''img-0_img-1']":
            images.length === 2,
          "[grid-template-areas:'img-0_img-2''img-1_img-2']":
            images.length === 3,
          "[grid-template-areas:'img-0_img-1''img-2_img-3']":
            images.length === 4,
        },
        className,
      )}
    >
      {images.map((el: any, i: number) => (
        <div
          key={i}
          className={cn(
            `md:rounded-2xl rounded-[8px] overflow-hidden [grid-area:img-${i}]`,
            {
              "col-span-2 row-span-2": images.length === 1,
              "col-span-1 row-span-2 ":
                images.length === 2 || (images.length === 3 && i === 1),
            },
          )}
        >
          {inView && (
            <ImageSelected selected={selected} images={images}>
              <FadeInSection className="w-full h-full">
                <Image
                  width={708}
                  height={412}
                  onClick={() => setSelected(i)}
                  className={cn(
                    `w-full h-full object-cover rounded-2xl aspect-[2.4/1.4] cursor-pointer`,
                    {
                      "aspect-[4.15/5]": images.length === 2,
                    },
                    {
                      "object-left": el.position === "left",
                      "object-center": el.position === "center",
                      "object-right": el.position === "right",
                      "object-bottom": el.position === "bottom",
                      "object-top": el.position === "top",
                    },
                  )}
                  src={inView ? el?.url : ""}
                  alt={el.filename || ""}
                  loading="lazy"
                />
              </FadeInSection>
            </ImageSelected>
          )}
        </div>
      ))}
    </div>
  );
};
