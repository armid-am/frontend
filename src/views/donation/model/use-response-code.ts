import { handleDonorAction } from "@/features/donation-form";
import { useRouter } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import toast from "react-hot-toast";
import { useMedia, useSearchParam } from "react-use";

export const useResponseCode = () => {
  const t = useTranslations("Donation.donatPopup");
  const router = useRouter();
  const _locale = useLocale();
  const locale = (_locale ?? "en") as "ru" | "en" | "hy";
  const isMobile = useMedia("(min-width: 768px)", true);
  const parseDonor = () => {
    try {
      const raw = localStorage.getItem("donor");
      if (!raw) return {};
      return JSON.parse(raw);
    } catch {
      return {};
    }
  };
  const handleDonorResponse = async (
    donor: any,
    status: "success" | "fail",
    locale: "ru" | "en" | "hy",
  ) => {
    try {
      await handleDonorAction(donor, status, locale);
    } catch (err) {
      console.error("handleDonorResponse failed:", err);
    }
  };
  const responseCode = useSearchParam("responseCode");
  React.useEffect(() => {
    if (!responseCode) return;

    // ✅ Проверяем — уже обрабатывали этот responseCode?
    const alreadyHandled = localStorage.getItem("donorHandled");
    if (alreadyHandled) {
      localStorage.removeItem("donorHandled");
      localStorage.removeItem("donor");
      router.replace("/donation");
      return;
    }

    const donor = parseDonor();
    const isSuccess = responseCode === "0";

    if (isSuccess) {
      toast.success(t("success"), {
        duration: 10000,
        icon: "🎉",
        style: {
          paddingInline: "16px",
          paddingBlock: "8px",
          maxWidth: !isMobile ? "100%" : "350px",
        },
      });
    } else {
      toast.error(t("error"), { duration: 10000 });
    }

    // ✅ Сразу помечаем как обработанное
    localStorage.setItem("donorHandled", "true");
    handleDonorResponse(donor, isSuccess ? "success" : "fail", locale);

    const timer = setTimeout(() => {
      localStorage.removeItem("donor");
      localStorage.removeItem("donorHandled");
      router.replace("/donation");
    }, 10000);

    return () => clearTimeout(timer);
  }, [responseCode]);
};
