"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  FadeInSection,
} from "@ui";
import { XIcon } from "@phosphor-icons/react";
import { useModalVideo } from "../model/use-modal-video";

interface Props {
  className?: string;
  children?: React.ReactNode;
  triggerClassName?: string;
  triggerParentClassName?: string;
  videoUrl?: string;
}

function buildSrc(url: string): string {
  const sep = url.includes("?") ? "&" : "?";
  return `${url}${sep}autoplay=1&mute=1&playsinline=1&rel=0&modestbranding=1&enablejsapi=1`;
}

export const ModalVideo: React.FC<Props> = ({
  className,
  children,
  videoUrl,
  triggerClassName,
  triggerParentClassName,
}) => {
  const { iframeRef, open, setOpen } = useModalVideo();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <FadeInSection className={triggerParentClassName}>
        <DialogTrigger className={triggerClassName} asChild>
          {children}
        </DialogTrigger>
      </FadeInSection>
      <DialogContent
        id="video-modal"
        showCloseButton={false}
        className={cn(
          "z-100 flex flex-col gap-0 items-center justify-center min-h-full bg-transparent! mx-auto w-full! max-w-[90%]! md:max-w-[70%]! p-0 overflow-hidden border-none rounded-2xl",
          className,
        )}
      >
        <DialogTitle className="hidden" />
        <div className="min-h-full flex-1 w-full" />
        <div className="flex items-center justify-center rounded-2xl w-full overflow-hidden bg-black">
          {open && videoUrl ? (
            <iframe
              ref={iframeRef}
              key={videoUrl}
              className="aspect-video rounded-2xl h-full w-full"
              src={buildSrc(videoUrl)}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : null}
        </div>
        <div className="w-full flex-1 relative">
          <DialogClose className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <XIcon className="w-6! h-6! text-white" />
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};
