import { AboutHero } from "@/components/about/AboutHero";
import { AboutStory } from "@/components/about/About-story";
import { CorePrinciples } from "@/components/about/Core-principles";
import { MilestoneJourney } from "@/components/about/milestone-journey";
import { Leadership } from "@/components/about/leadership";
import { AboutCta } from "@/components/about/about-cta";

function AboutUs() {
  return (
    <div>
      <AboutHero />
      <AboutStory />
      <CorePrinciples />
      <MilestoneJourney />
      <Leadership />
      <AboutCta />
    </div>
  );
}

export default AboutUs;
