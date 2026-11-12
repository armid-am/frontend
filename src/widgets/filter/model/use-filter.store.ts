import { create } from "zustand";

type State = {
  category: string | null;
  subCategory: Set<string>;
  setCategory: (value: string | null) => void;
  setSubCategory: (value: Set<string>) => void;
  toggleSubCategory: (key: string) => void;
  resetSubCategory: () => void;
};

export const useFilterStore = create<State>((set, get) => ({
  category: null,
  setCategory: (value) => set({ category: value }),
  subCategory: new Set([]),
  setSubCategory: (next) => set({ subCategory: next }),
  toggleSubCategory: (key: string) => {
    const next = new Set(get().subCategory);
    next.has(key) ? next.delete(key) : next.add(key);
    set({ subCategory: next });
  },
  resetSubCategory: () => set({ subCategory: new Set() }),
}));
