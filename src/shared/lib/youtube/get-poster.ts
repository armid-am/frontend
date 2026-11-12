import { getYouTubeId } from "./get-youtube-id";

export function getPoster(url?: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/maxresdefault.jpg` : "";
}
