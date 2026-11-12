import { create } from "zustand";

interface StateStore {
  value: string;
  setValue: (value: string) => void;
}

export const useFoundationTabStore = create<StateStore>((set, get) => ({
  value: "about",
  setValue: (value) => {
    set({ value: value || get().value });
  },
}));
