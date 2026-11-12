"use client";
import React from "react";
import { cn } from "@/shared/lib/cn";
import { useInView } from "react-intersection-observer";

export const FadeInSection: React.FC<{
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
}> = ({ children, className, threshold = 0.4, id }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold });

  return (
    <div
      id={id}
      ref={ref}
      className={cn(
        "w-full transform transition-[opacity,transform,translate] duration-700 ease-out will-change-[opacity,transform,translate]",
        inView ? "opacity-100 translate-y-0!" : "opacity-0 translate-y-10",
        className,
      )}
    >
      {children}
    </div>
  );
};
