// widgets/post/lib/build-video-json-ld.ts
import { getPoster } from "@/shared/lib/youtube";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://armid.am";

type VideoData = {
  title?: string;
  description?: string;
  date?: string;
  createdAt?: string;
  updatedAt?: string;
  url?: string;
  image?: { url?: string } | number | null;
  [key: string]: unknown;
};

type Params = {
  data: VideoData;
  locale: string;
  title: string; // slug из params
  path: string; // например "gallery/video"
  orgName: string;
};

const toISO = (v?: string) => {
  const d = v ? new Date(v) : null;
  return d && !isNaN(d.getTime()) ? d.toISOString() : undefined;
};

const toAbsolute = (url: string) =>
  url.startsWith("http") ? url : `${SITE_URL}${url}`;

// "https://www.youtube.com/watch?v=ID" | "https://youtu.be/ID" | "/embed/ID" -> ID
const getYoutubeId = (url?: string) => {
  if (!url) return undefined;
  const m = url.match(/(?:v=|youtu\.be\/|embed\/|shorts\/)([\w-]{11})/);
  return m?.[1];
};

export function buildVideoJsonLd({
  data,
  locale,
  title,
  path,
  orgName,
}: Params) {
  const videoUrl =
    data.url || (data["url-youtube-vudeo"] as string | undefined);
  const youtubeId = getYoutubeId(videoUrl);

  const imageUrl = typeof data.image === "object" ? data.image?.url : undefined;
  const thumbnail: string | undefined =
    imageUrl || getPoster(videoUrl) || undefined;

  const pageUrl = `${SITE_URL}/${locale}/${path}/${title}`;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: data.title,
    description: data.description || data.title,
    ...(thumbnail && { thumbnailUrl: [toAbsolute(thumbnail)] }),
    uploadDate: toISO(data.date) ?? toISO(data.createdAt),
    inLanguage: locale,
    ...(youtubeId
      ? { embedUrl: `https://www.youtube.com/embed/${youtubeId}` }
      : videoUrl && { contentUrl: toAbsolute(videoUrl) }),
    publisher: {
      "@type": "Organization",
      name: orgName,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: pageUrl,
  };
}
