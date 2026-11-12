import {
  FacebookLogoIcon,
  LinkedinLogoIcon,
  TelegramLogoIcon,
  WhatsappLogoIcon,
  XLogoIcon,
} from "@phosphor-icons/react/ssr";

export const shareLinksArray = [
  {
    ariaLabel: "Share on Linkedin",
    Icon: LinkedinLogoIcon,
    url: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
  },
  {
    ariaLabel: "Share on X (Twitter)",
    Icon: XLogoIcon,
    url: (url: string) => `https://twitter.com/intent/tweet?url=${url}`,
  },
  {
    ariaLabel: "Share on Telegram",
    Icon: TelegramLogoIcon,
    url: (url: string) => `https://t.me/share/url?url=${url}`,
  },
  {
    ariaLabel: "Share on Whats app",
    Icon: WhatsappLogoIcon,
    url: (url: string) => `https://wa.me/?text=${url}`,
  },
  {
    ariaLabel: "Share on Facebook",
    Icon: FacebookLogoIcon,
    url: (url: string) => `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  },
];
