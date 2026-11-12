import React from "react";
import { cn } from "@/shared/lib/cn";
import { FadeInSection } from "@/shared/ui";
import Image from "next/image";

interface Props {
  className?: string;
  image: any;
  fullName: string;
  skill?: string;
  bio?: string;
}

export const UserItem: React.FC<Props> = (props) => {
  const { className, fullName, bio, skill, image } = props;
  return (
    <FadeInSection
      className={cn(
        "flex flex-col justify-items-start gap-1 text-primary justify-start items-center",
        className,
      )}
    >
      <FadeInSection className="rounded-4xl relative mb-2 overflow-hidden w-30 aspect-square">
        <span className="absolute inset-0 backdrop-grayscale-100"></span>
        <Image
          style={{
            objectFit: "cover",
            objectPosition: image.position,
          }}
          src={image.url}
          alt={fullName}
          loading="lazy"
          width={120}
          height={120}
          className={cn("grayscale h-full w-full")}
        />
      </FadeInSection>
      <FadeInSection className=" text-base sm:text-[20px] uppercase font-montserat leading-6 sm:leading-7 font-semibold">
        {fullName?.includes("/") ? (
          <>
            {fullName.split("/")[0]}
            <br />
            {fullName.split("/")[1]}
          </>
        ) : (
          fullName
        )}
      </FadeInSection>

      {skill && (
        <FadeInSection className="text-base font-montserat leading-6 text-black">
          {skill}
        </FadeInSection>
      )}
      {bio && (
        <FadeInSection className="font-montserat text-[10px] leading-4 text-[#191717]">
          {bio}
        </FadeInSection>
      )}
    </FadeInSection>
  );
};
