import React from "react";
import { useClickAway } from "react-use";

export const useMenu = () => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const ref = React.useRef(null);
  useClickAway(ref, () => {
    setMenuOpen(false);
  });
  return { menuOpen, setMenuOpen, ref };
};
