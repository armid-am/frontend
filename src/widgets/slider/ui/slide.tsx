"use client";

import React from "react";
import { getPoster, getPosterFallback } from "@/shared/lib/youtube";
import { PlayIcon } from "@phosphor-icons/react";
import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";
import { useSlideHeightStore } from "@/shared/lib/hooks";
import { cn } from "@/shared/lib/cn";

// react-player must be client-only.
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Props {
  className?: string;
  videoUrl?: string;
  videoTitle?: string;
  isPlay?: boolean;
  onVideoPlay?: () => void;
  onVideoStop?: () => void;
}

export const Slide: React.FC<Props> = ({
  className,
  videoUrl,
  isPlay = false,
  onVideoPlay,
  onVideoStop,
}) => {
  const sliderRef = React.useRef<HTMLDivElement>(null);
  const { setslideHeight } = useSlideHeightStore();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  // The player is kept mounted underneath the poster so that tapping play
  // starts an ALREADY-LOADED player inside the user's gesture — this is what
  // makes it play on the first tap on iPhone Safari (mounting the iframe on tap
  // and telling it to play afterwards loses the gesture and iOS refuses).
  const [playerKey, setPlayerKey] = React.useState(0);
  const [showPreview, setShowPreview] = React.useState(true);
  // `ready` flips true once react-player's onReady fires. We block the play tap
  // until then, so a tap right after a refresh can't land on an unready player
  // (which is what leaves you staring at YouTube's own play button on iOS).
  const [ready, setReady] = React.useState(false);
  const playingRef = React.useRef(false);
  // Fallback timer that hides the poster even if onPlay never fires.
  const revealTimerRef = React.useRef<number | null>(null);
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  // When this slide stops being the active one, reset it and remount a fresh
  // player so the next activation starts clean
  React.useEffect(() => {
    if (!isPlay) {
      playingRef.current = false;
      setShowPreview(true);
      setReady(false);
      if (revealTimerRef.current) {
        clearTimeout(revealTimerRef.current);
        revealTimerRef.current = null;
      }
      setPlayerKey((prev) => prev + 1);
      onVideoStop?.();
      forceUpdate();
    }
  }, [isPlay]);

  React.useEffect(() => {
    if (sliderRef.current) {
      setslideHeight(sliderRef.current.clientHeight);
    }
  }, []);

  // maxresdefault doesn't exist for every video; fall back to hqdefault so we
  // never show a broken-image icon.
  const [poster, setPoster] = React.useState(() => getPoster(videoUrl));
  React.useEffect(() => {
    const max = getPoster(videoUrl);
    if (!max) {
      setPoster("");
      return;
    }
    setPoster(max);
    const img = new window.Image();
    img.onerror = () => setPoster(getPosterFallback(videoUrl));
    img.src = max;
  }, [videoUrl]);

  return (
    <div ref={sliderRef} className={cn("slider-ellipse__slide", className)}>
      <div
        ref={ref}
        className="absolute inset-0 flex items-center h-full w-full justify-center bg-black bg-opacity-40 -z-1"
      />

      <ReactPlayer
        key={playerKey}
        url={inView ? videoUrl : ""}
        width="100%"
        height="100%"
        className="aspect-video w-full h-full object-cover"
        playing={playingRef.current}
        controls
        config={{
          youtube: {
            playerVars: { playsinline: 1 },
          },
        }}
        onReady={() => setReady(true)}
        onPlay={() => {
          // Playback actually started — now drop the poster (hides the brief
          // YouTube play-button flash that happens during startup).
          if (revealTimerRef.current) {
            clearTimeout(revealTimerRef.current);
            revealTimerRef.current = null;
          }
          setShowPreview(false);
        }}
        onEnded={() => {
          playingRef.current = false;
          setShowPreview(true);
          onVideoStop?.();
          forceUpdate();
        }}
      />

      {showPreview && (
        <div
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          style={{
            backgroundImage: poster ? `url(${poster})` : undefined,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundColor: !poster ? "#000" : undefined,
          }}
        >
          {isPlay && (
            <button
              aria-label="play video"
              className={cn(
                "cursor-pointer flex items-center justify-center rounded-full w-14 h-14 md:w-18 md:h-18 lg:w-22 lg:h-22 bg-black/40 transition-opacity",
                // Dim until the player is ready so the tap-to-play is honest.
                ready ? "opacity-100" : "opacity-50",
              )}
              onClick={(e) => {
                if (!ready) return;
                e.stopPropagation();
                playingRef.current = true;
                onVideoPlay?.();
                forceUpdate();
                if (revealTimerRef.current)
                  clearTimeout(revealTimerRef.current);
                revealTimerRef.current = window.setTimeout(
                  () => setShowPreview(false),
                  1500,
                );
              }}
            >
              <PlayIcon
                weight="bold"
                color="white"
                size={40}
                className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
