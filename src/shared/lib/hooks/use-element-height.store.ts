import { create } from "zustand";

interface StateElementHeight {
  elementHeight: number;
  setElementHeight: (height: number) => void;
}

export const useElementHeightStore = create<StateElementHeight>((set) => ({
  elementHeight: 0,
  setElementHeight: (height: number) => set({ elementHeight: height }),
}));
