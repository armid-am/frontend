import React, { Suspense } from "react";
import { cn } from "@/shared/lib/cn";
import { TabButtons } from "@/features/tab-buttons";
import { MapContainer } from "./map-container";
import { Container, Title, FadeInSection } from "@ui";
interface Props {
  className?: string;
  data: any;
}

export const Map: React.FC<Props> = ({ className, data: map }) => {
  const data = map;

  return (
    <section className="mb-10">
      <Container
        className={cn("flex max-w-360 flex-col justify-center", className)}
      >
        <FadeInSection>
          <Title
            size="n"
            text={data?.title}
            className="text-center mb-4 md:mb-8 text-primary"
          />
        </FadeInSection>
        <FadeInSection>
          <Suspense>
            <TabButtons
              className="justify-center"
              data={data?.provinceNames}
              currentProvince={20}
            />
          </Suspense>
        </FadeInSection>
        <Suspense>
          <MapContainer data={data} />
        </Suspense>
      </Container>
    </section>
  );
};
