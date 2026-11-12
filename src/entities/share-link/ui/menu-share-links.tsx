"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { SocialLinksShare } from "./share-links-list";
import { XIcon, ShareNetworkIcon } from "@phosphor-icons/react";
import { useClickAway } from "react-use";

interface Props {
  className?: string;
}

export const MenuShareLinks: React.FC<Props> = (props) => {
  const { className } = props;
  const [isOpen, setIsOpen] = React.useState(false);
  const ref = React.useRef(null);

  useClickAway(ref, () => {
    setIsOpen(false);
  });

  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-1000 right-4 min-[445px]:right-10 bottom-4 min-[445px]:bottom-10 rounded-bl-xl rounded-br-xl",
        {
          "bg-transparent": isOpen,
        },
        className,
      )}
    >
      <button
        aria-label="open share menu"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "p-3 md:p-4 bg-primary w-full rounded-bl-xl rounded-xl delay-[230ms,0ms] transition-[border-radius,background-color] duration-300 rounded-br-xl cursor-pointer",
          {
            "bg-transparent": isOpen,
          },
        )}
      >
        {isOpen ? (
          <XIcon className="w-6 h-6 text-primary" strokeWidth="2px" />
        ) : (
          <ShareNetworkIcon className="w-6 h-6 text-white" />
        )}
      </button>
      <SocialLinksShare
        className={cn(
          "flex-col origin-bottom transform-[scale(1,0)] z-10 overflow-hidden transition-transform duration-300 gap-0 items-center w-fit absolute bottom-full right-0 rounded-xl bg-primary",
          {
            "transform-[scale(1,1)]": isOpen,
          },
        )}
        classNameLink="text-white p-3 md:p-4"
      />
    </div>
  );
};
