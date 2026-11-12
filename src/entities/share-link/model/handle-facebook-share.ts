export const handleFacebookShare = (preventDefault: any, url: string) => {
  if (typeof navigator === "undefined") return;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
  if (!isIOS) return;
  preventDefault();
  const webUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
  const fbAppUrl = `fb://share?link=${url}`;
  const start = Date.now();
  const fallbackTimer = window.setTimeout(() => {
    if (Date.now() - start < 2500 && document.visibilityState === "visible") {
      window.location.href = webUrl;
    }
  }, 1200);
  const onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      window.clearTimeout(fallbackTimer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    }
  };
  document.addEventListener("visibilitychange", onVisibilityChange);
  window.location.href = fbAppUrl;
};
