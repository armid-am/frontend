import React from "react";
import { useClickAway } from "react-use";

export const useOpenMenu = () => {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => setOpen(false));

  return { open, setOpen, ref };
};
