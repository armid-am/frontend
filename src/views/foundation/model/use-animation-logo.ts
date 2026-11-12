"use client";
import React from "react";

export const useAnimationLogo = (value: number) => {
  const svgRef = React.useRef<SVGSVGElement>(null);
  React.useEffect(() => {
    if (!svgRef.current) return;
    const svg = svgRef.current;

    let container: HTMLElement | null = svg.parentElement;
    while (container && !container.classList.contains("animation-logo")) {
      container = container.parentElement;
    }

    const paths = svg.querySelectorAll("path");
    const groups = svg.querySelectorAll("g");
    const time = 160;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let maxFinishMs = 5300;

    paths.forEach((path, i) => {
      const length = path.getTotalLength();
      const delay = i / 12;

      if (i < value) {
        const dur = length / time;

        path.style.opacity = "1";
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.style.animation = `drawPath ${dur}s ease-in-out ${delay}s forwards`;

        const finishAt = (delay + dur) * 1000 + 250;
        if (finishAt > maxFinishMs) maxFinishMs = finishAt;
      } else {
        path.style.strokeDasharray = "800";
        path.style.strokeDashoffset = "800";
        path.style.animation = `fadeIn 0.2s ease-in-out ${delay}s forwards`;

        const finishAt = (delay + 0.2) * 1000 + 250;
        if (finishAt > maxFinishMs) maxFinishMs = finishAt;
      }
    });

    // Lock the final state into both inline styles AND a `.loaded` class so
    // the static CSS rules carry the visible state without depending on
    // `animation-fill-mode: forwards`. iOS Safari drops forwards-state during
    // scroll repaints, which made the logo vanish.
    const lockFinalState = () => {
      if (container) container.classList.add("loaded");
      paths.forEach((p) => {
        p.style.animation = "none";
        p.style.opacity = "1";
      });
      groups.forEach((g) => {
        (g as SVGGElement).style.animation = "none";
        (g as SVGGElement).style.opacity = "0";
      });
    };

    timers.push(setTimeout(lockFinalState, maxFinishMs + 100));

    // Re-assert the locked state every time the logo re-enters the viewport.
    // On iOS the compositor can clear the SVG's rasterized content during
    // scroll; re-applying inline styles forces a fresh paint with the right
    // values.
    let observer: IntersectionObserver | null = null;
    if (container && typeof IntersectionObserver !== "undefined") {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (
              entry.isIntersecting &&
              container &&
              container.classList.contains("loaded")
            ) {
              paths.forEach((p) => {
                p.style.opacity = "1";
              });
              groups.forEach((g) => {
                (g as SVGGElement).style.opacity = "0";
              });
            }
          }
        },
        { threshold: 0 },
      );
      observer.observe(container);
    }

    return () => {
      timers.forEach((t) => clearTimeout(t));
      observer?.disconnect();
    };
  }, [value]);

  return {
    svgRef,
  };
};
