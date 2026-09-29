import type { testimonials } from "./approved-content";

/** Design placeholders. They are visibly marked as samples in the homepage UI. */
export const demoTestimonials: typeof testimonials = [
  {
    id: "sample-01",
    name: "Sample client 01",
    role: "Illustrative feedback",
    image: "/assets/images/julian-crawford.svg",
    quote: "The property options were easy to compare, and the information helped me narrow down what to explore next.",
  },
  {
    id: "sample-02",
    name: "Sample client 02",
    role: "Illustrative feedback",
    image: "/assets/images/helena-vance.svg",
    quote: "I appreciated seeing the location, budget and property details together before reaching out for a conversation.",
    featured: true,
  },
  {
    id: "sample-03",
    name: "Sample client 03",
    role: "Illustrative feedback",
    image: "/assets/images/robert-sterling.svg",
    quote: "The layout made it simple to discover different kinds of spaces and decide which ones suited my plans.",
  },
  {
    id: "sample-04",
    name: "Sample client 04",
    role: "Illustrative feedback",
    image: "/assets/images/elena-sterling.svg",
    quote: "Having a clear starting point for my property search made the next steps feel more manageable.",
  },
  {
    id: "sample-05",
    name: "Sample client 05",
    role: "Illustrative feedback",
    image: "/assets/images/marcus-thorne.svg",
    quote: "I could look through residential and commercial ideas and focus on the spaces that mattered to me.",
  },
  {
    id: "sample-06",
    name: "Sample client 06",
    role: "Illustrative feedback",
    image: "/assets/images/julian-v-extrovate.svg",
    quote: "The visual presentation and practical filters helped me think through the kind of property I wanted.",
  },
];
