"use client";
/* eslint-disable @typescript-eslint/no-unused-expressions */

import { useEffect, useRef, useState } from "react";
import { useIntersection } from "react-use";

export const useSliderEllipse = (count: number, videoPlaying: boolean) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<NodeListOf<HTMLDivElement>>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const intersection = useIntersection(
    sliderRef as React.RefObject<HTMLElement>,
    { threshold: 0.5 },
  );
  // Start at the middle slide directly so the very first update() positions
  // slides at their final layout. No intermediate "around index 0" pass that
  // would otherwise be visible as a left-to-right snap on refresh.
  const [activeOrder, setActiveOrder] = useState(() =>
    count > 1 ? Math.floor(count / 2) : 0,
  );
  // `update()` is also invoked by the resize/ResizeObserver listeners, which
  // capture the closure from mount and would otherwise always see the INITIAL
  // activeOrder. On mobile, scrolling fires resize constantly (the URL bar
  // shows/hides), so that stale closure kept snapping the slider back to the
  // starting slide. Reading the active index from a ref keeps every call —
  // including stale-captured ones — in sync with the current slide.
  const activeOrderRef = useRef(activeOrder);
  // Touch tracking. We record where a touch starts and how far it travels so
  // we can tell a deliberate tap (select that slide) apart from a scroll/swipe.
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const touchLastX = useRef(0);
  const touchLastY = useRef(0);
  const touchMoved = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    slidesRef.current = container.querySelectorAll<HTMLDivElement>(
      ".slider-ellipse__slide",
    );
    if (!slidesRef.current) return;
    slidesRef.current.forEach((slide, i) => {
      slide.dataset.order = i.toString();
      slide.addEventListener("click", () => {
        // While scrolling on mobile the browser still fires a `click` on the
        // slide under the finger, which used to jump the carousel to that
        // (off-center) slide — looking like it switched the wrong way. Only
        // treat it as a tap when the finger barely moved.
        if (touchMoved.current) return;
        setActiveOrder(i);
      });
    });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: true });
    container.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("resize", update);

    // Container starts collapsed on mobile (zustand seeds slideHeight=0).
    // When the first Slide reports its real height and the container grows,
    // ResizeObserver re-runs update() so slides land at the correct positions
    // without waiting for the 3s autoplay tick to reveal the jump.
    let resizeObs: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObs = new ResizeObserver(() => update());
      resizeObs.observe(container);
    }

    update();
    return () => {
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("resize", update);
      resizeObs?.disconnect();
    };
  }, [count]);

  useEffect(() => {
    // не запускаем автопрокрутку если играет видео
    if (videoPlaying) return;

    let interval: number | null = null;

    if (intersection?.isIntersecting) {
      interval = window.setInterval(() => {
        handleNav("next");
      }, 3000);

      const stopAuto = () => {
        if (interval !== null) {
          clearInterval(interval);
          interval = null;
        }
      };
      sliderRef.current?.addEventListener("click", stopAuto);

      return () => {
        sliderRef.current?.removeEventListener("click", stopAuto);
        if (interval !== null) clearInterval(interval);
      };
    }
  }, [intersection?.isIntersecting, videoPlaying]);

  useEffect(() => {
    activeOrderRef.current = activeOrder;
    update();
    setPagination();
  }, [activeOrder]);

  const onTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    touchLastX.current = touchStartX.current;
    touchLastY.current = touchStartY.current;
    touchMoved.current = false;
  };

  const onTouchMove = (e: TouchEvent) => {
    touchLastX.current = e.touches[0].clientX;
    touchLastY.current = e.touches[0].clientY;
    const dx = Math.abs(touchLastX.current - touchStartX.current);
    const dy = Math.abs(touchLastY.current - touchStartY.current);
    // Past this threshold it's a scroll/swipe, not a tap.
    if (dx > 10 || dy > 10) touchMoved.current = true;
  };

  const onTouchEnd = () => {
    const dx = touchLastX.current - touchStartX.current;
    const dy = touchLastY.current - touchStartY.current;
    // Only act on a clearly horizontal swipe; vertical scrolls are ignored so
    // the carousel never changes slides while the page is being scrolled.
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      handleNav(dx < 0 ? "next" : "prev");
    }
  };

  const update = () => {
    if (!slidesRef.current || !containerRef.current) return;
    const slides = slidesRef.current;
    const count = slides.length;
    const { width, height } = containerRef.current.getBoundingClientRect();
    // Container has no real layout yet — bail out so we don't cache positions
    // calculated against a 0×0 box that the slides would then transition into.
    if (width < 1 || height < 1) return;
    const centerX = width / 2;
    const centerY = height * 0.6;
    const a = width * 0.37;
    const b = height * 0.01;
    const maxVisible = Math.min(4, Math.floor(count / 2));
    const isWide = window.matchMedia("(min-width: 1576px)").matches;
    const visibleRange = isWide
      ? Math.min(2, maxVisible)
      : Math.min(1, maxVisible);

    const active = activeOrderRef.current;
    slides.forEach((slide, k) => {
      let i = (((k - active) % count) + count) % count;
      if (i > count / 2) i -= count;
      const distance = Math.abs(i);
      slide.style.translate = "0 -9%";

      if (distance <= visibleRange) {
        const overlay = slide.querySelector<HTMLElement>(
          ".poster-overlay-light",
        );
        const scale = Math.max(0.7, 1 - distance * 0.12);
        let bgWhite = Math.max(0, distance * 0.6);
        window.matchMedia("(min-width: 1024px)").matches
          ? (bgWhite = distance * 0.4)
          : null;
        const x = centerX + i * (a / maxVisible);
        const y = centerY - b * (1.1 - distance / (maxVisible + 2));
        slide.style.left = `${x}px`;
        slide.style.top = `${y}px`;
        slide.style.transform = `translate(-50%, -50%) scale(${scale})`;
        if (overlay) {
          overlay.style.background = `rgba(255, 255, 255, ${bgWhite})`;
        }
        slide.style.pointerEvents = "auto";
        slide.style.zIndex = `${count - distance}`;
        slide.style.opacity = "1";
      } else {
        const side = i >= 0 ? 1 : -1;
        slide.style.left = `${centerX + side * a * 1.5}px`;
        slide.style.top = `${centerY}px`;
        slide.style.transform = `translate(-50%, -50%) scale(0.7)`;
        slide.style.pointerEvents = "none";
        slide.style.zIndex = "0";
        slide.style.opacity = "0";
      }
    });

    // After slides are placed against a real-sized container, mark the
    // container as ready so subsequent moves animate. Until `.ready` is set,
    // CSS forces `transition: none` on slides, so the very first paint snaps
    // them to their initial positions instead of crawling in from default
    // (top-left) coordinates. Double rAF lets the activeOrder=0 → middle
    // re-render settle before transitions are enabled.
    const el = containerRef.current;
    if (el && !el.classList.contains("ready")) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.classList.add("ready");
        });
      });
    }
  };

  const setPagination = () => {
    if (!paginationRef.current || !slidesRef.current) return;
    const buttons = paginationRef.current.querySelectorAll<HTMLButtonElement>(
      ".slider-ellipse__pagination-button",
    );
    const len = buttons.length;
    const active = activeOrderRef.current;
    buttons.forEach((btn, i) => {
      btn.classList.toggle(
        "slider-ellipse__pagination-button_active",
        i === active,
      );
      const distance = Math.abs(i - active);
      const maxDistance = Math.floor(len / 2);
      const scale =
        distance === 0 ? 1 : Math.max(0.4, 1 - (distance / maxDistance) * 0.6);
      btn.style.transform = `scale(${scale})`;
      btn.style.opacity = `${1 - (distance / maxDistance) * 0.5}`;
    });
  };

  useEffect(() => {
    if (!containerRef.current) return;
    slidesRef.current = containerRef.current.querySelectorAll<HTMLDivElement>(
      ".slider-ellipse__slide",
    );
  }, [count]);

  const handleNav = (dir: "prev" | "next") => {
    if (!slidesRef.current) return;
    if (dir === "prev") {
      setActiveOrder(
        (prev) =>
          (prev - 1 + slidesRef.current!.length) % slidesRef.current!.length,
      );
    } else {
      setActiveOrder((prev) => (prev + 1) % slidesRef.current!.length);
    }
  };

  return {
    handleNav,
    update,
    setPagination,
    setActiveOrder,
    activeOrder,
    containerRef,
    paginationRef,
    slidesRef,
    onTouchMove,
    sliderRef,
  };
};
