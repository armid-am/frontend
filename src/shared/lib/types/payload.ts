export interface BoardOfGuardianUser {
  id: number;
  image: number | Media;
  fullName: string;
  skill: string;
  bio?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface TeamUser {
  id: number;
  image: number | Media;
  fullName: string;
  skill: string;
  updatedAt: string;
  createdAt: string;
}
export interface SupportersUser {
  id: number;
  image: number | Media;
  fullName: string;
  updatedAt: string;
  createdAt: string;
}
export interface SupportersCompany {
  id: number;
  image: number | Media;
  text: string;
  updatedAt: string;
  createdAt: string;
}
export interface Foundation {
  id: number;
  hero?: {
    image?: (number | null) | Media;
    title?: string | null;
    position?: string;
  };
  title1?: string | null;
  title2?: string | null;
  title3?: string | null;
  "categories-links"?: {
    "category-links-title"?: (number | FoundationLink)[] | null;
  };
  about?: {
    title?: string | null;
    logo?: {
      "logo-image"?: (number | null) | Media;
      "logo-text"?: string | null;
      "logo-subtext"?: string | null;
    };
    description?: string | null;
  };
  "board-of-guardians"?: {
    title?: string | null;
    "board-guardian-users"?: (number | BoardOfGuardianUser)[] | null;
  };
  team?: {
    title?: string | null;
    "team-users"?: (number | TeamUser)[] | null;
  };
  supporters?: {
    title?: string | null;
    "supporters-companies"?: (number | SupportersCompany)[] | null;
    "supporters-users"?: (number | SupportersUser)[] | null;
    "supporter-author-post"?: {
      "author-image"?: (number | null) | Media;
      "author-fullName"?: string | null;
      "author-top-text"?: string | null;
      "author-bottom-text"?: string | null;
    };
  };
  project?: {
    title?: string | null;
    "first-text"?: string | null;
    "second-text"?: string | null;
    image?: (number | null) | Media;
    posts?:
      | {
          "before-title"?: string | null;
          title?: string | null;
          text?: string | null;
          id?: string | null;
        }[]
      | null;
    "third-text"?: string | null;
    "second-posts"?:
      | {
          text?: string | null;
          id?: string | null;
        }[]
      | null;
    "fourth-text"?: string | null;
  };
  "our-activity"?: {
    title?: string | null;
    post?:
      | {
          image?: (number | null) | Media;
          text?: string | null;
          id?: string | null;
        }[]
      | null;
    "bottom-text"?: string | null;
  };
  topics?: {
    title?: string | null;
    posts?:
      | {
          title?: string | null;
          text?: string | null;
          id?: string | null;
        }[]
      | null;
    "first-text"?: string | null;
    "image-first"?: (number | null) | Media;
    "image-second"?: (number | null) | Media;
    "image-third"?: (number | null) | Media;
    "bottom-text"?: string | null;
  };
  updates?: (number | Update)[] | null;
  reports?: (number | Report)[] | null;
  video?: {
    "video-url"?: string | null;
    poster?: (number | null) | Media;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Update {
  id: number;
  title: string;
  description: string;
  media?:
    | {
        image?: (number | null) | Media;
        url?: string | null;
        id?: string | null;
      }[]
    | null;
  date: string;
  updatedAt: string;
  createdAt: string;
}
export interface VideoGallery {
  id: number;
  title: string;
  link: string;
  videoPosts: VideoPost[];
  updatedAt: string;
  createdAt: string;
}
export interface VideoPost {
  id: number;
  title: string;
  poster?: (number | null) | Media;
  address: string;
  "url-youtube-vudeo"?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface Media {
  id: number;
  alt: string;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
  focalX?: number | null;
  focalY?: number | null;
}
export interface HeroSliderSection {
  id: number;
  videoTitle: string;
  poster?: (number | null) | Media;
  videoPosts: number | VideoPost;
  updatedAt: string;
  createdAt: string;
}
export interface Home {
  id: number;
  hero: {
    "image-mobile"?: null | Media;
    "image-desktop"?: null | Media;
    title: string;
    "button-text": string;
    videoModal: string | null;
  };
  slider: {
    title: string;
    heroSliderSection: (number | HeroSliderSection)[];
  };
  map: {
    title: string;
    "map-info-links": (number | Map)[];
    "button-text": string;
    "close-button-text": string;
    "open-button-text": string;
    status: string | null;
    provinceNames: ProvinceName[];
  };
  "image-logo-slider": {
    logoSlider: (number | LogoSlider)[];
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Report {
  id: number;
  title: string;
  description: string;
  media?:
    | {
        image?: (number | null) | Media;
        url?: string | null;
        type?: ("horizontal" | "vertical") | null;
        id?: string | null;
      }[]
    | null;
  date: string;
  updatedAt: string;
  createdAt: string;
}
export interface LogoSlider {
  id: number;
  name?: string | null;
  "logo-image"?: (number | null) | Media;
  url?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface ProvinceName {
  id: number;
  name: string;
  province?: (number | null) | Map;
  updatedAt: string;
  createdAt: string;
}
export interface Map {
  id: number;
  provinceName: string;
  "number-of-monuments": number;
  "monuments-text": string;
  Area: number;
  population: number;
  cities: number;
  villages: number;
  "text-title": string;
  text: string;
  videoPosts?: (number | VideoPost)[] | null;
  updatedAt: string;
  createdAt: string;
}
export interface FoundationLink {
  id: number;
  name: string;
  linkTo: string;
  url: string;
  updatedAt: string;
  createdAt: string;
}
export interface GalleryItem {
  id: number;
  name?: string | null;
  item?: VideoGallery[] | null;
  updatedAt: string;
  createdAt: string;
}
export interface SocialLink {
  id: number;
  socialLinks: SocialIconLink[];
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface CategoryVideo {
  id: number;
  name?: string | null;
  updatedAt: string;
  createdAt: string;
}
export interface Footer {
  id: number;
  logo: {
    "logo-sub-text": string;
  };
  foundation: {
    "foundation-links"?: FoundationLink[] | null;
  };
  gallery: {
    "gallery-links"?: GalleryItem[] | null;
  };
  contact: {
    "social-links": SocialIconLink[];
    "company-links": CompanyLink[];
  };
  subscribe: {
    text: string;
  };
  "bottom-text": {
    text: string;
  };
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface Gallery {
  position: any;
  id: number;
  image?: (number | null) | Media;
  title: string;
  galleryCategory?: GalleryItem[] | null;
  topCategory?: CategoryVideo[] | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
export interface SocialIconLink {
  id: number;
  name?: string | null;
  url: string;
  updatedAt: string;
  createdAt: string;
}
export interface CompanyLink {
  id: number;
  icon: number | Media;
  label: string;
  url: string;
  updatedAt: string;
  createdAt: string;
}
