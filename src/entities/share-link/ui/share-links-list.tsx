"use client";

import React from "react";
import { cn } from "@/shared/lib/cn";
import {
  CopyIcon,
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TelegramLogoIcon,
  XLogoIcon,
  WhatsappLogoIcon,
} from "@phosphor-icons/react";
import { handleFacebookShare, useCopyLink, useSocialLinkShare } from "../model";

interface Props {
  className?: string;
  classNameIcon?: string;
  classNameLink?: string;
  weight?: "bold" | "regular" | "fill" | "duotone" | "light" | "thin";
  size?: number;
  share?: boolean;
  shareUrl?: string;
}

export const SocialLinksShare: React.FC<Props> = (props) => {
  const {
    className,
    classNameIcon,
    classNameLink,
    weight = "bold",
    size = 24,
  } = props;
  const { url } = useSocialLinkShare();
  const copyLink = useCopyLink();
  return (
    <ul className={cn("flex bg-primary gap-4", className)}>
      <li>
        <a
          rel="noopener noreferrer"
          aria-label="Share on Linkedin"
          className={cn("block p-2", classNameLink)}
          target="_blank"
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        >
          <LinkedinLogoIcon
            className={classNameIcon}
            size={size}
            weight={weight}
          />
        </a>
      </li>
      <li>
        <a
          rel="noopener noreferrer"
          aria-label="Share on X (Twitter)"
          className={cn("block p-2", classNameLink)}
          target="_blank"
          href={`https://twitter.com/intent/tweet?url=${url}`}
        >
          <XLogoIcon className={classNameIcon} size={size} weight={weight} />
        </a>
      </li>
      <li>
        <a
          rel="noopener noreferrer"
          aria-label="Share on Telegram"
          className={cn("block p-2", classNameLink)}
          target="_blank"
          href={`https://t.me/share/url?url=${url}`}
        >
          <TelegramLogoIcon
            className={classNameIcon}
            size={size}
            weight={weight}
          />
        </a>
      </li>
      <li>
        <a
          rel="noopener noreferrer"
          aria-label="Share on Whats app"
          className={cn("block p-2", classNameLink)}
          target="_blank"
          href={`https://wa.me/?text=${url}`}
        >
          <WhatsappLogoIcon
            className={classNameIcon}
            size={size}
            weight={weight}
          />
        </a>
      </li>
      <li>
        <a
          className={cn("block p-2", classNameLink)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Share on Facebook"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          onClick={(e) => handleFacebookShare(e.preventDefault, url)}
        >
          <FacebookLogoIcon
            className={classNameIcon}
            size={size}
            weight={weight}
          />
        </a>
      </li>
      <li>
        <button
          aria-label="share url"
          className={cn("block cursor-pointer p-2", classNameLink)}
          onClick={copyLink}
        >
          <CopyIcon className={classNameIcon} size={size} weight={weight} />
        </button>
      </li>
    </ul>
  );
};
