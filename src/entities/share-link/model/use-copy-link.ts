import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
// import { useMedia } from "react-use";
import { useSocialLinkShare } from "./use-social-link-share";

export const useCopyLink = () => {
  // const isMobile = useMedia("(min-width: 768px)", true);
  const t = useTranslations("");
  const { fullUrl } = useSocialLinkShare();
  return () => {
    try {
      navigator.clipboard.writeText(fullUrl);
      navigator.share?.({
        url: fullUrl,
      });
      toast.success(t("clipBoard.copy"), {
        icon: "🎉",
        position: "top-center",
        // position: isMobile ? "top-center" : "bottom-center",
      });
    } catch (err) {
      console.error("Share cancelled or failed:", err);
      toast.error(t("clipBoard.error"));
    }
  };
};
