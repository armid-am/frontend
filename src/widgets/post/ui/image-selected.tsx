"use client";
import { cn } from "@/shared/lib/cn";
import type React from "react";
import { XIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  images: any[];
  children?: React.ReactNode;
  selected: number;
  className?: string;
  onImageClick?: (index: number) => void;
}

export function ImageSelected({
  images,
  children,
  selected,
  className,
  onImageClick,
}: Props) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(selected || 0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const media = images || [];

  // Минимальное расстояние свайпа
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextImage();
    } else if (isRightSwipe) {
      handlePrevImage();
    }
  };
  // Обработчик клавиш клавиатуры
  // Скролл — отдельно
  useEffect(() => {
    if (!isFullScreen) return;

    const scrollY = window.scrollY;
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      const savedTop = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      window.scrollTo({
        top: parseInt(savedTop || "0") * -1,
        left: 0,
        behavior: "instant" as ScrollBehavior,
      });
    };
  }, [isFullScreen]);
  // Клавиатура — отдельно
  useEffect(() => {
    if (!isFullScreen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          handlePrevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          handleNextImage();
          break;
        case "Escape":
          e.preventDefault();
          setIsFullScreen(false);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullScreen]);

  useEffect(() => {
    setCurrentImageIndex(selected || 0);
  }, [selected]);
  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? media.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === media?.length - 1 ? 0 : prev + 1));
  };

  const openFullScreen = (index: number) => {
    setCurrentImageIndex(index);
    setIsFullScreen(true);
    if (onImageClick) {
      onImageClick(index);
    }
  };

  const closeFullScreen = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsFullScreen(false);
    }
  };

  // Если children передан, используем кастомный рендер
  if (children) {
    return (
      <>
        <div
          className={cn("cursor-pointer h-full w-full", className)}
          onClick={() => openFullScreen(selected || 0)}
        >
          {children}
        </div>
        {renderFullScreenModal()}
      </>
    );
  }

  function renderFullScreenModal() {
    if (!isFullScreen) return null;
    return (
      <div
        className="fixed inset-0 z-100 flex items-center justify-center bg-black/90 backdrop-blur-sm"
        onClick={closeFullScreen}
      >
        <div
          className={cn(
            "relative w-full h-full flex items-center justify-center",
            {
              "justify-between": media.length > 1,
            },
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            onClick={() => setIsFullScreen(false)}
            className="absolute inset-0"
          ></div>
          {/* Close button */}
          <button
            onClick={() => setIsFullScreen(false)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 transition-colors z-105"
            aria-label="Close full screen"
          >
            <XIcon className="w-6 h-6 text-white" />
          </button>
          {media.length > 1 && (
            <div
              className="self-stretch absolute left-2 top-1/2 -translate-y-1/2 md:static md:translate-y-0 group z-102 px-2 justify-center flex items-center cursor-pointer"
              onClick={handlePrevImage}
            >
              <button
                className="p-3 cursor-pointer rounded-full bg-black/20 group-hover:bg-black/90 z-102 transition-colors text-white"
                aria-label="Previous image"
              >
                <CaretLeftIcon weight="bold" className="w-6 h-6" />
              </button>
            </div>
          )}
          {/* Main image container */}
          <div
            onClick={() => setIsFullScreen(false)}
            onTouchStart={media.length > 1 ? onTouchStart : undefined}
            onTouchMove={media.length > 1 ? onTouchMove : undefined}
            onTouchEnd={media.length > 1 ? onTouchEnd : undefined}
            className="relative z-100 w-full px-4 md:px-0 h-full flex items-center justify-center max-w-7xl max-h-[90vh]"
          >
            <Image
              ref={imageRef}
              src={
                media[currentImageIndex]?.url ||
                media[currentImageIndex]?.src ||
                "/placeholder.svg"
              }
              alt={`Full screen image ${currentImageIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
              className={cn("w-full h-full object-contain")}
              width={media[currentImageIndex]?.width || 0}
              height={media[currentImageIndex]?.height || 0}
            />
            {/* Image counter */}
            {media.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium">
                {currentImageIndex + 1} / {media.length}
              </div>
            )}
          </div>
          {media.length > 1 && (
            <div
              className="self-stretch absolute top-1/2 right-2 -translate-y-1/2 md:static md:translate-y-0 group z-101 group px-2 justify-center flex items-center cursor-pointer"
              onClick={handleNextImage}
            >
              <button
                className="p-3 cursor-pointer rounded-full bg-black/20 group-hover:bg-black/90 z-101 transition-colors text-white"
                aria-label="Next image"
              >
                <CaretRightIcon weight="bold" className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}
