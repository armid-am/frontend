import { create } from "zustand";

interface StateElementHeight {
  slideHeight: number;
  setslideHeight: (height: number) => void;
}

export const useSlideHeightStore = create<StateElementHeight>((set) => ({
  slideHeight: 0,
  setslideHeight: (height: number) => set({ slideHeight: height }),
}));
