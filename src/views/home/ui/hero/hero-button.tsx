import React from "react";
import { cn } from "@/shared/lib/cn";
import { ModalVideo } from "@/entities/modal-video";
import { Button } from "@ui";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr";
import { getTranslations } from "next-intl/server";

interface Props {
  className?: string;
  data: any;
}

export const HeroButton: React.FC<Props> = async (props) => {
  const { className, data } = props;
  const t = await getTranslations("HeaderImg");

  return (
    <ModalVideo
      triggerParentClassName="flex justify-center"
      videoUrl={data || ""}
    >
      <Button
        aria-label="open video modal"
        variant="destructive"
        className={cn(
          "group empty:p-0 cursor-pointer h-auto tracking-[0.56px]! leading-5 font-montserat hover:scale-110 flex items-center sm:text-[20px] text-[14px] px-8! py-4!",
          className,
        )}
      >
        <PlayIcon
          weight="bold"
          size={20}
          className="text-[#781214] w-5! h-5! group-hover:text-white mb-[1.5px]"
        />
        {t("buttonText")}
      </Button>
    </ModalVideo>
  );
};
