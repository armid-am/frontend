"use client";
import React from "react";
import { Tabs } from "@ui";
import { useFoundationTabStore } from "@/features/foundation-tabs";

interface Props {
  children?: React.ReactNode;
}

export const TabsWrapper: React.FC<Props> = (props) => {
  const { children } = props;
  const { value } = useFoundationTabStore();
  return <Tabs value={value || "about"}>{children}</Tabs>;
};
