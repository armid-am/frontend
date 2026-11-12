import React from "react";
import { cn } from "@/shared/lib/cn";
import { Card, CardContent, Container, Hero, FadeInSection } from "@ui";
import { SocialLinks } from "@/entities/social-link";
import { CompanyLinks } from "@/entities/company-link";
import { getContact } from "../api/get-contact";
import { ContactForm } from "@/features/contact-form";

interface Props {
  className?: string;
}

export const Contact: React.FC<Props> = async (props) => {
  const { className } = props;
  const data = await getContact();
  return (
    <div className={cn("", className)}>
      <Hero
        // isLoading={isLoading}
        position={data?.position}
        imgUrl={data?.image.url}
        title={data?.title}
      />
      <Container className="p-4 py-10 flex flex-col md:flex-row md:items-stretch items-center gap-6 justify-center">
        <FadeInSection threshold={0.1} className="w-full max-w-sm">
          <Card className="w-full p-10">
            <CardContent className="p-0">
              <ContactForm />
            </CardContent>
          </Card>
        </FadeInSection>
        <FadeInSection threshold={0.1} className="w-full min-h-full max-w-sm">
          <Card className="w-full min-h-full py-10">
            <CardContent className="min-h-full">
              <FadeInSection threshold={0.1} className="flex flex-col gap-6">
                <p className="font-montserat leading-5 text-[14px]">
                  {data?.["text"]}
                </p>
                <div className="w-fit mx-auto md:mx-0 flex flex-col gap-4">
                  <hr className="w-full" />
                  <CompanyLinks
                    isContact
                    className="w-fit gap-4 grid mx-auto md:mx-0"
                  />
                </div>
                <div>
                  <SocialLinks className="bg-transparent w-fit mx-auto md:mx-0" />
                </div>
              </FadeInSection>
            </CardContent>
          </Card>
        </FadeInSection>
      </Container>
    </div>
  );
};
