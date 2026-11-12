import { create } from "zustand";

interface StateProvince {
  activeProvince: number;
  setActiveProvince: (value: number) => void;
}

export const useProvinceStore = create<StateProvince>((set) => ({
  activeProvince: 20,
  setActiveProvince: (value) => set({ activeProvince: value }),
}));
