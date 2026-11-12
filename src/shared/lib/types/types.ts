export interface Media {
  id: number;
  alt?: string | null;
  position?: ("center" | "top" | "bottom" | "left" | "right") | null;
  updatedAt: string;
  createdAt: string;
  url?: string | null;
  thumbnailURL?: string | null;
  filename?: string | null;
  mimeType?: string | null;
  filesize?: number | null;
  width?: number | null;
  height?: number | null;
}

export interface VideoPost {
  id: number;
  keyword?: string | null;
  date?: string | null;
  title?: string | null;
  address?: string | null;
  poster?: (number | null) | Media;
  "url-youtube-vudeo"?: string | null;
  description?: string | null;
  posts?:
    | (
        | {
            images?: (number | Media)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "images";
          }
        | {
            url?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "video";
          }
        | {
            text?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "text";
          }
        | {
            title?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "title";
          }
        | {
            quote?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "quote";
          }
      )[]
    | null;
}

export interface Update {
  id: number;
  keyword?: string | null;
  title?: string | null;
  date?: string | null;
  province?: string | null;
  image?: (number | null) | Media;
  url?: string | null;
  description?: string | null;
  posts?:
    | (
        | {
            images?: (number | Media)[] | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "images";
          }
        | {
            url?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "video";
          }
        | {
            text?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "text";
          }
        | {
            title?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "title";
          }
        | {
            quote?: string | null;
            id?: string | null;
            blockName?: string | null;
            blockType: "quote";
          }
      )[]
    | null;
}

export interface ProvinceName {
  id: number;
  name?: string | null;
  "section-title"?: string | null;
  "number-of-monuments"?: number | null;
  "monuments-text"?: string | null;
  Area?: number | null;
  population?: number | null;
  cities?: number | null;
  villages?: number | null;
  text?: string | null;
  videoPosts?: (number | VideoPost)[] | null;
}
