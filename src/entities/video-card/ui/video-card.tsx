"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { MapPinIcon } from "@phosphor-icons/react";
import qs from "qs";
import { Link } from "@/i18n/navigation";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { getPoster, getPosterFallback } from "@/shared/lib/youtube";
import { FadeInSection } from "@ui";
import { useElementHeightStore } from "@/shared/lib/hooks";

// react-player must be client-only.
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Props {
  className?: string;
  place?: string;
  title?: string;
  videoUrl: string;
  videoClassName?: string;
  isPost?: boolean;
  iframeBoxClassName?: string;
  keyword?: string;
}

export const VideoCard: React.FC<Props> = ({
  className,
  place,
  title,
  videoUrl,
  videoClassName,
  isPost,
  iframeBoxClassName,
  keyword,
}) => {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const { setElementHeight } = useElementHeightStore();

  // Post cards navigate to the post page via the Link overlay; they don't play
  // inline, so they don't need a player.
  const isLinkCard = Boolean(keyword && isPost);

  // Pre-mount the player once the card scrolls near the viewport, so by the
  // time the user taps it's already loaded and plays within the gesture — the
  // same approach that fixed the slider. Lazy so a gallery doesn't load every
  // YouTube player at once.
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    rootMargin: "300px",
  });

  const [showPreview, setShowPreview] = React.useState(true);
  const [ready, setReady] = React.useState(false);
  const playingRef = React.useRef(false);
  // Fallback timer that hides the poster even if onPlay never fires.
  const revealTimerRef = React.useRef<number | null>(null);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    if (containerRef.current) {
      setElementHeight(containerRef.current.offsetHeight);
    }
  }, []);

  const slugUrl = qs
    .stringify({ "": keyword }, { encode: false, arrayFormat: "comma" })
    .slice(1)
    .split(" ")
    .join("-");

  // maxresdefault is missing for some videos; fall back to hqdefault so the
  // card never shows a broken-image icon.
  const [thumbnailPoster, setThumbnailPoster] = React.useState(() =>
    getPoster(videoUrl),
  );
  React.useEffect(() => {
    const max = getPoster(videoUrl);
    if (!max) {
      setThumbnailPoster("");
      return;
    }
    setThumbnailPoster(max);
    const img = new window.Image();
    img.onerror = () => setThumbnailPoster(getPosterFallback(videoUrl));
    img.src = max;
  }, [videoUrl]);

  return (
    <FadeInSection
      className={cn("w-full relative flex flex-col gap-4", className)}
    >
      {isLinkCard && (
        <Link
          aria-label={"link to " + title + " post page"}
          prefetch={true}
          className="absolute inset-0 z-100"
          href={`/gallery/video/${slugUrl}`}
        />
      )}

      <FadeInSection>
        <div
          ref={(node) => {
            containerRef.current = node;
            inViewRef(node);
          }}
          className={cn(
            "w-full aspect-video relative rounded-2xl overflow-hidden bg-white",
            iframeBoxClassName,
          )}
        >
          {/* Pre-mounted, ready player started inside the user's tap — plays on
              the first tap including iPhone Safari (same as the slider). */}
          {!isLinkCard && inView && (
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              className={cn("aspect-video w-full h-full", videoClassName)}
              playing={playingRef.current}
              controls
              config={{
                youtube: {
                  playerVars: { playsinline: 1 },
                },
              }}
              onReady={() => setReady(true)}
              onPlay={() => {
                // Drop the poster only once playback truly starts, hiding the
                // brief YouTube play-button flash during startup.
                if (revealTimerRef.current) {
                  clearTimeout(revealTimerRef.current);
                  revealTimerRef.current = null;
                }
                setShowPreview(false);
              }}
              onEnded={() => {
                playingRef.current = false;
                setShowPreview(true);
                forceUpdate();
              }}
            />
          )}

          {showPreview && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-2xl overflow-hidden z-20"
              style={{
                backgroundImage: thumbnailPoster
                  ? `url(${thumbnailPoster})`
                  : undefined,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: !thumbnailPoster ? "#fff" : undefined,
              }}
            >
              <button
                aria-label="play video"
                className={cn(
                  "cursor-pointer transition-opacity",
                  // Dim until the player is ready (inline cards only).
                  !isLinkCard && !ready ? "opacity-50" : "opacity-100",
                )}
                onClick={(e) => {
                  // Link cards navigate (the Link overlay handles the tap).
                  if (isLinkCard) return;
                  // Wait until the player is ready so an early tap can't fail.
                  if (!ready) return;
                  e.stopPropagation();
                  playingRef.current = true;
                  forceUpdate();
                  if (revealTimerRef.current)
                    clearTimeout(revealTimerRef.current);
                  revealTimerRef.current = window.setTimeout(
                    () => setShowPreview(false),
                    1500,
                  );
                }}
              >
                <svg
                  width="56"
                  height="56"
                  viewBox="0 0 56 56"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    width="56"
                    height="56"
                    rx="28"
                    fill="black"
                    fillOpacity="0.4"
                  />
                  <path
                    d="M41.3113 25.8837L23.3013 14.8675C22.9236 14.6372 22.4915 14.5113 22.0493 14.5026C21.607 14.4939 21.1704 14.6026 20.7839 14.8178C20.3974 15.033 20.0749 15.3468 19.8494 15.7273C19.6238 16.1079 19.5032 16.5414 19.5 16.9837V39.0162C19.5032 39.4586 19.6238 39.8921 19.8494 40.2726C20.0749 40.6532 20.3974 40.967 20.7839 41.1822C21.1704 41.3974 21.607 41.5061 22.0493 41.4974C22.4915 41.4887 22.9236 41.3627 23.3013 41.1325L41.3113 30.1162C41.6744 29.8952 41.9746 29.5844 42.1828 29.2138C42.3911 28.8431 42.5005 28.4251 42.5005 28C42.5005 27.5748 42.3911 27.1569 42.1828 26.7862C41.9746 26.4156 41.6744 26.1048 41.3113 25.8837ZM22.5 38.1062V17.8937L39.02 28L22.5 38.1062Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          )}
        </div>
      </FadeInSection>

      {(title || place) && (
        <FadeInSection threshold={0} className="flex flex-col gap-1.5">
          {title && (
            <span className="font-semibold font-montserrat text-base leading-snug truncate">
              {title}
            </span>
          )}
          {place && (
            <span className="flex items-center gap-1 font-montserrat text-sm leading-normal text-muted-foreground">
              <MapPinIcon size={14} />
              {place}
            </span>
          )}
        </FadeInSection>
      )}
    </FadeInSection>
  );
};
