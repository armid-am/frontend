import React from "react";

function sendCommand(
  iframe: HTMLIFrameElement | null,
  func: string,
  args: unknown[] = [],
) {
  iframe?.contentWindow?.postMessage(
    JSON.stringify({ event: "command", func, args }),
    "*",
  );
}
export const useModalVideo = () => {
  const [open, setOpen] = React.useState(false);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const unmute = () => {
      sendCommand(iframeRef.current, "unMute");
      sendCommand(iframeRef.current, "setVolume", [100]);
    };
    const timers = [
      setTimeout(() => {
        sendCommand(iframeRef.current, "playVideo");
        unmute();
      }, 500),
      setTimeout(unmute, 1400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [open]);

  return { open, setOpen, iframeRef };
};
