import { getTranslations } from "next-intl/server";
import React from "react";

export const LayoutTitle: React.FC = async () => {
  const t = await getTranslations("metadata");

  return (
    <h1 className="sr-only">
      {t("title")}
      {t("description")}
    </h1>
  );
};
