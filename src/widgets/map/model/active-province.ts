import { OptionsProvince } from "@/widgets/map/config/map";
import { useProvinceStore } from "@/shared/lib/hooks";
export const useActiveProvince = () => {
  const { activeProvince: selectedProvince } = useProvinceStore();

  const isActiveProvince = (el: OptionsProvince) => {
    return selectedProvince === el.id ||
      (selectedProvince === 13 && !el.fill) ||
      (selectedProvince === 27 && el.id !== 16 && !el.fill)
      ? "rgb(147,65,67)"
      : el.fill
        ? "#fff"
        : "#781214";
  };
  return {
    isActiveProvince,
  };
};
