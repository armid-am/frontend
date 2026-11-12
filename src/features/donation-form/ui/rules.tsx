import React from "react";
import { cn } from "@/shared/lib/cn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@ui";
import { XIcon } from "@phosphor-icons/react/ssr";

interface Props {
  className?: string;
  title: string;
  items: Array<{ title: string; text: string }>;
  children?: React.ReactNode;
}

export const Rules: React.FC<Props> = (props) => {
  const { className, title, items, children } = props;
  return (
    <Dialog>
      <DialogOverlay className="z-105 bg-black/70" />
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className={cn(
          "z-105 flex flex-col gap-0 max-w-225! w-full! max-[932px]:max-w-auto! max-[932px]:w-[calc(100vw-32px)]! max-[932px]:h-[80vh]",
          className,
        )}
      >
        <div className="flex gap-4 w-full mb-4 border-b border-gray-200 pb-4 items-center justify-between">
          <DialogTitle className="font-bold text-primary leading-[120%]! tracking-[0.06em] text-[24px] md:text-[32px]">
            {title}
          </DialogTitle>
          <DialogClose>
            <XIcon className="text-primary" />
          </DialogClose>
        </div>
        <dl className="overflow-auto!">
          {items?.map((item, index) => (
            <div key={index}>
              <dt
                className="font-bold mb-2 uppercase pr-2 leading-6 text-primary font-montserat text-base sm:text-[18px] tracking-[0.04em]"
                key={index}
              >
                {item.title}
              </dt>
              <dd className="text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] pr-2 mb-5 leading-5 tracking-[0.04em] font-montserat">
                {item.text}
              </dd>
            </div>
          ))}
        </dl>
      </DialogContent>
    </Dialog>
  );
};
