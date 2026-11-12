"use client";

import React from "react";
import { cn } from "@/shared/lib/cn";
import Image from "next/image";

interface Props {
  className?: string;
}

export const HeroBgVideo: React.FC<Props> = (props) => {
  const { className } = props;
  const [viewportHeight, setViewportHeight] = React.useState<number | null>(
    null,
  );
  const [failed, setFailed] = React.useState(false);
  const [videoSrc, setVideoSrc] = React.useState<string | null>(null);
  React.useEffect(() => {
    setViewportHeight(window.innerHeight);
  }, []);
  React.useEffect(() => {
    const mq = window.matchMedia("(max-width: 576px)");
    const update = () =>
      setVideoSrc(mq.matches ? "/bg-mobile.mp4" : "/bg-desktop.mp4");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // iOS Safari requires both `muted` and `playsinline` (with the legacy
    // webkit attribute) for autoplay. Set them via both property and HTML
    // attribute so the engine sees them on every render path.
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    let detached = false;
    const cleanups: (() => void)[] = [];

    const add = <K extends Event>(
      target: EventTarget,
      type: string,
      handler: (e: K) => void,
      opts?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler as EventListener, opts);
      cleanups.push(() =>
        target.removeEventListener(type, handler as EventListener, opts),
      );
    };

    const detachAll = () => {
      if (detached) return;
      detached = true;
      while (cleanups.length) {
        const fn = cleanups.pop();
        fn?.();
      }
    };

    const tryPlay = () => {
      if (detached) return;
      if (!video.paused && !video.ended) {
        detachAll();
        return;
      }
      const p = video.play();
      if (p && typeof p.then === "function") {
        p.then(() => detachAll()).catch(() => {
          /* keep listeners — another trigger will retry */
        });
      }
    };

    // First attempt immediately on mount.
    tryPlay();

    // Retry whenever the video becomes more ready. iOS often rejects the
    // first play() if metadata isn't fully buffered yet.
    add(video, "loadedmetadata", tryPlay);
    add(video, "loadeddata", tryPlay);
    add(video, "canplay", tryPlay);
    add(video, "canplaythrough", tryPlay);

    // If the tab/page is hidden when we mount (prerender, background tab),
    // retry as soon as it becomes visible.
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    add(document, "visibilitychange", onVisible);

    // Any user gesture unlocks playback on Low Power Mode and other strict
    // iOS states. Use passive listeners so scroll perf isn't affected.
    add(document, "touchstart", tryPlay, { passive: true });
    add(document, "touchend", tryPlay, { passive: true });
    add(document, "pointerdown", tryPlay, { passive: true });
    add(document, "click", tryPlay);
    add(document, "scroll", tryPlay, { passive: true });

    // Safety net for the body fade-in window: mobile Safari can still
    // silently reject play() right after reveal while opacity transitions.
    const timers = [200, 700, 1500].map((ms) => window.setTimeout(tryPlay, ms));
    cleanups.push(() => timers.forEach((t) => window.clearTimeout(t)));

    return () => detachAll();
  }, [videoSrc]);
  return (
    <div
      style={{
        height: viewportHeight ? viewportHeight - 16 : undefined,
      }}
      className={cn(
        "",
        { "min-h-[calc(100svh-16px)]": !viewportHeight },
        className,
      )}
    >
      {failed || !videoSrc ? (
        <Image
          fill
          src="/header-img.jpg"
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover -z-10"
        />
      ) : (
        <video
          key={videoSrc}
          ref={videoRef}
          className={cn("absolute inset-0 w-full h-full object-cover -z-10")}
          src={videoSrc}
          // poster="/header-img.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          onError={() => setFailed(true)}
          {...({
            "webkit-playsinline": "true",
            "x5-playsinline": "true",
            fetchPriority: "high",
          } as React.VideoHTMLAttributes<HTMLVideoElement>)}
        ></video>
      )}
    </div>
  );
};
