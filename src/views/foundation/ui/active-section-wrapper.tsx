"use client";

import React from "react";
import { useActiveSection } from "@/views/foundation/model/use-active-section";

interface Props {
  children: React.ReactNode;
  sectionName: string;
  treshhold?: number;
  className?: string;
}

export const ActiveSectionWrapper: React.FC<Props> = ({
  children,
  sectionName,
  treshhold = 0.3,
  className,
}) => {
  const { name, ref } = useActiveSection(sectionName, treshhold);

  return (
    <section id={name}>
      <div className={className} ref={ref}>
        {children}
      </div>
    </section>
  );
};
