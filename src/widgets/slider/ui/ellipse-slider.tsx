import "../css/slider-ellipse.css";
import { cn } from "@/shared/lib/cn";
import { Container, Title, FadeInSection } from "@ui";
import { EllipseSliderContainer } from "./ellipse-slider-container";

interface Props {
  data: any;
  className?: string;
}

export const EllipseSlider = (props: Props) => {
  const { data, className } = props;
  return (
    <section className={cn("mb-[10%]", className)}>
      <Container className={cn("mx-auto! max-w-387.5!")}>
        <FadeInSection>
          <Title
            className="text-center mb-4 md:mb-8 text-primary"
            text={data?.title}
            size="n"
          />
        </FadeInSection>
        <FadeInSection threshold={0.1}>
          <EllipseSliderContainer data={data} />
        </FadeInSection>
      </Container>
    </section>
  );
};
