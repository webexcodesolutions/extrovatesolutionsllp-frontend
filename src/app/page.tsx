import AboutSection from "@/components/home/about";
import Hero from "../components/home/hero";
import Projects from "../components/home/projects";
import DifferenceSection from "@/components/home/difference";
import ValuesSection from "@/components/home/our-values";
import ExpertiseSection from "@/components/home/our-expertise";
import TestimonialsSection from "@/components/home/testimonialsSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    // <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

    // </div>
    <main>
      <Hero />
      <AboutSection />
      <Projects />
      <DifferenceSection />
      <ValuesSection />
      <ExpertiseSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  );
}
