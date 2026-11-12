import React from "react";
import { HomeHero } from "./hero/home-hero";
import { EllipseSlider } from "@/widgets/slider";
import { Map } from "@/widgets/map";
import { Updates } from "./updates";
import { getHome } from "../api/get-home";
import { LogoSlider } from "@/widgets/logo-slider";

export const Home: React.FC = async () => {
  const data = await getHome();

  return (
    <>
      <HomeHero data={data.hero} />
      <EllipseSlider data={data.slider} />
      <Map data={data.map} />
      <LogoSlider data={data["image-logo-slider"]} />
      <Updates data={data.updates} />
    </>
  );
};
