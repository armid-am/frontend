import { useProvinceStore } from "@/shared/lib/hooks";
import { useFilter } from "@/widgets/filter";

const posts = (items: any[] = []) => items.flatMap((el) => el.videoPosts ?? []);

export const filterGallery = (data: any) => {
  const { category: rawCategory, subCategory } = useFilter(
    data.galleryCategory || [],
  );
  const activeProvince = useProvinceStore((state) => state.activeProvince);

  const province = activeProvince ? Number(activeProvince) : undefined;
  const category = rawCategory ? Number(rawCategory) : undefined;
  const subCategories = Array.from(subCategory).map(Number);

  const currentCategory = data.galleryCategory.find(
    (el: any) => el.id === category,
  );

  const categoryData = category
    ? posts(
        currentCategory?.item.filter((el: any) =>
          subCategories.includes(Number(el.id)),
        ),
      )
    : posts(data.galleryCategory.flatMap((el: any) => el.item));

  const provinceIds = new Set(
    posts(
      data.topCategory.filter((el: any) => el.provinceName === province),
    ).map((el: any) => el.id),
  );

  if (province === 27) {
    return {
      ...data,
      filteredGallery: categoryData,
    };
  }

  return {
    ...data,
    filteredGallery: categoryData.filter((el: any) => provinceIds.has(el.id)),
  };
};
