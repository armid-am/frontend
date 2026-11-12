import React from "react";
import { cn } from "@/shared/lib/cn";
import { Container, Hero, FadeInSection } from "@ui";
import { Filter } from "@/widgets/filter";
import { SidebarIcon } from "@phosphor-icons/react/ssr";
import { GallerySidebar } from "./gallery-sidebar";
import { GalleryCatalog } from "./gallery-catalog";
import { getGallery } from "../api/get-gallery";
import { getLocale } from "next-intl/server";
import { GalleryTabButtons } from "./gallery-tab-buttons";
interface Props {
  className?: string;
}

export const Gallery: React.FC<Props> = async ({ className }) => {
  const locale = await getLocale();
  const data = await getGallery(locale);

  return (
    <div className={cn("mb-10 md:mb-20 sm:min-h-screen", className)}>
      <Hero
        // isLoading={isLoading}
        position={data?.position}
        imgUrl={data?.image?.url as string}
        title={data?.title}
      />
      <Container className="pt-4 lg:pt-10">
        <div className="contents lg:flex items-start gap-4 lg:gap-10">
          <Filter
            data={data.galleryCategory}
            className="hidden lg:grid max-w-85.5 w-full"
          />
          <FadeInSection className="mb-4 w-auto sticky z-50 top-25">
            <GallerySidebar data={data.galleryCategory || []}>
              <SidebarIcon />
            </GallerySidebar>
          </FadeInSection>
          <div>
            <GalleryTabButtons data={data || []} />
            <GalleryCatalog data={data || []} className="mt-10" />
          </div>
        </div>
      </Container>
    </div>
  );
};
