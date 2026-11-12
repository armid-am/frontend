import { Media, ProvinceName, Update, VideoPost } from "@/shared/lib/types";

export interface HeroSliderSection {
  id: number;
  videoTitle?: string | null;
  poster?: (number | null) | Media;
  videoPosts?: (number | null) | VideoPost;
}
export interface LogoSlider {
  id: number;
  name?: string | null;
  "logo-image"?: (number | null) | Media;
  url?: string | null;
}

export interface HomeDTO {
  id: number;
  hero?: {
    title?: string | null;
    videoModal?: string | null;
  };
  slider?: {
    title?: string | null;
    heroSliderSection?: HeroSliderSection[] | null;
  };
  map?: {
    title?: string | null;
    provinceNames?: ProvinceName[] | null;
  };
  "image-logo-slider"?: {
    title?: string | null;
    logoSlider?: LogoSlider[] | null;
  };
  updates?: {
    title?: string | null;
    text?: string | null;
    updates?: Update[] | null;
  };
}
