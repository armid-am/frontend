import { getYouTubeId } from "./get-youtube-id";

export function getPosterFallback(url?: string): string {
  const id = getYouTubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}
