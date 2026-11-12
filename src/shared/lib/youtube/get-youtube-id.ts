export function getYouTubeId(url?: string): string {
  if (!url) return "";

  const patterns = [
    /youtu\.be\/([^?&]{11})/, // https://youtu.be/VIDEO_ID?si=...
    /[?&]v=([^#&]{11})/, // https://youtube.com/watch?v=VIDEO_ID
    /youtube\.com\/embed\/([^?&]{11})/, // https://youtube.com/embed/VIDEO_ID
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }

  return "";
}
