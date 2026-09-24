import AboutSection from "@/components/home/about";
import Hero from "../components/home/hero";
import Projects from "../components/home/projects";
import DifferenceSection from "@/components/home/difference";
import ValuesSection from "@/components/home/our-values";
import ExpertiseSection from "@/components/home/our-expertise";
import TestimonialsSection from "@/components/home/testimonialsSection";
import CTASection from "@/components/home/CTASection";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <Projects />
      <DifferenceSection />
      <ValuesSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
