import Carousel from "@/Components/landing/Banner";
import { FeaturesSection } from "@/Components/landing/FeaturesSection";
import LatestItems from "@/Components/landing/LatestCards";
import { PromoBanner } from "@/Components/landing/PromoBanner";
import { TestimonialsSection } from "@/Components/landing/Testimonials";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Carousel></Carousel>
      <LatestItems></LatestItems>
      <FeaturesSection></FeaturesSection>
      <TestimonialsSection></TestimonialsSection>
      <PromoBanner></PromoBanner>
    </div>
  );
}
