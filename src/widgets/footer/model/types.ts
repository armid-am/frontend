export interface FoundationLink {
  id: number;
  name?: string | null;
}

export interface GalleryCategory {
  id: number;
  name?: string | null;
  disabled?: boolean | null;
}

export interface FooterDTO {
  id: number;
  logo?: {
    "logo-sub-text"?: string | null;
  };
  foundation?: {
    "foundation-links"?: FoundationLink[] | null;
  };
  gallery?: {
    "gallery-links"?: GalleryCategory[] | null;
  };
  subscribe?: {
    text?: string | null;
  };
  "bottom-text"?: {
    text?: string | null;
  };
}
