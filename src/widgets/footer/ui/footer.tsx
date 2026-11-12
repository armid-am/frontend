import { getTranslations } from "next-intl/server";
import { getFooter } from "../api/get-footer";
import { cn } from "@/shared/lib/cn";
import { Container, FadeInSection, Logo } from "@ui";
import { FoundationLinks } from "./foundation-links";
import { GalleryLinks } from "./gallery-links";
import { CompanyLinks } from "@/entities/company-link";
import { SubscribeForm } from "@/features/subscribe-newsletter";
import "../css/footer.css";
import { SocialLinks } from "@/entities/social-link";
interface Props {
  className?: string;
}

export const Footer: React.FC<Props> = async ({ className }) => {
  const data = await getFooter();
  const t = await getTranslations("Footer");
  return (
    <footer>
      <FadeInSection
        threshold={0}
        className={cn(
          "pt-14 shadow-[0px_-7px_9px_-1px_rgba(0,0,0,0.1)]",
          className,
        )}
      >
        <Container className="max-w-420 max-lg:flex-wrap max-lg:justify-center flex justify-between gap-6 mb-5">
          <div className="grid grid-footer-areas text-center min-[440px]:text-start min-[440px]:items-start gap-6 gap-y-10! w-full justify-around">
            <div className="[grid-area:logo] space-y-5 -mt-2.75">
              <Logo
                imgClassName="max-w-auto w-auto"
                className="text-primary pointer-events-none flex max-[440px]:justify-center text-4xl! mb-4 -mt-0.75"
              />
              <p className="font-montserat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] leading-5 tracking-[4%]">
                {data?.logo?.["logo-sub-text"]}
              </p>
            </div>
            <div className="[grid-area:foundation] grid gap-2">
              <h2 className="text-2xl tracking-[00.1rem] text-primary font-bebas">
                {t("Foundation.title")}
              </h2>
              <hr />
              {data?.foundation?.["foundation-links"]?.length && (
                <FoundationLinks
                  data={data?.foundation?.["foundation-links"]}
                />
              )}
            </div>
            <div className="[grid-area:gallery] grid gap-2">
              <h2 className="text-2xl tracking-[00.1rem] text-primary font-bebas">
                {t("Gallery.title")}
              </h2>
              <hr />
              {data?.gallery?.["gallery-links"]?.length && (
                <GalleryLinks data={data?.gallery?.["gallery-links"]} />
              )}
            </div>
            <div className="[grid-area:contact] grid gap-2">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl tracking-[00.1rem] text-primary font-bebas">
                  {t("Contact.title")}
                </h2>
                <hr />
                <CompanyLinks className="flex flex-col gap-2 w-fit mx-auto min-[440px]:mx-0 items-start" />
              </div>
              <SocialLinks />
            </div>
            <div className="[grid-area:subscribe] grid gap-2 max-[440px]:mx-auto">
              <h2 className="text-2xl tracking-[00.1rem] text-primary font-bebas">
                {t("Subscribe.title")}
              </h2>
              <hr />
              <p className="font-montserat text-[clamp(0.75rem,0.1875rem+2.5vw,0.875rem)] mb-2 leading-5 tracking-[4%]">
                {data?.subscribe?.text}
              </p>
              <SubscribeForm />
            </div>
          </div>
        </Container>

        <hr className="w-full" />
        <div className="flex items-center justify-center gap-1 py-6">
          <p className="text-[12px] leading-4 tracking-[4%] font-montserat text-center font-medium">
            {data?.["bottom-text"]?.text}
          </p>
        </div>
      </FadeInSection>
    </footer>
  );
};
