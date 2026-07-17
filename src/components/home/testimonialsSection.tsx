"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    id: 1,
    name: "Julian Crawford",
    role: "Tech Entrepreneur",
    image: "/testimonials/client-1.jpg",
    quote:
      "Extrovate didn't just find me a house; they found me a masterpiece. Their attention to architectural detail and professional guidance during the closing process was unparalleled.",
  },
  {
    id: 2,
    name: "Helena Vance",
    role: "Portfolio Manager",
    image: "/testimonials/client-2.jpg",
    quote:
      "The loan assistance program was a game-changer for our investment portfolio. The rates they secured were significantly better than what we found independently. Truly a full-service experience.",
    featured: true,
  },
  {
    id: 3,
    name: "Robert Sterling",
    role: "Art Collector",
    image: "/testimonials/client-3.jpg",
    quote:
      "I've worked with many real estate firms, but Extrovate's commitment to 'The Frame' aesthetic and their transparent communication sets them in a league of their own.",
  },
  {
    id: 4,
    name: "Sophia Bennett",
    role: "Business Owner",
    image: "/testimonials/client-1.jpg",
    quote:
      "The professionalism and market expertise demonstrated by the team made our investment journey seamless and rewarding.",
  },
  {
    id: 5,
    name: "Ethan Hayes",
    role: "Investor",
    image: "/testimonials/client-2.jpg",
    quote:
      "Their strategic advice and personalized support exceeded expectations. I would highly recommend Extrovate to anyone.",
  },
  {
    id: 6,
    name: "Emma Wilson",
    role: "Architect",
    image: "/testimonials/client-3.jpg",
    quote:
      "Every interaction reflected their commitment to quality and transparency. A truly premium experience from start to finish.",
  },
];

export default function TestimonialsSection() {
  const plugin = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  );

  return (
    <section className="bg-background py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-secondary">
            CLIENT PERSPECTIVES
          </p>

          <h2 className="font-montserrat mt-4 text-4xl font-bold text-foreground md:text-5xl">
            Stories of Satisfaction
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
            Hear from our clients about their exceptional experiences with
            Extrovate Solutions and discover why we remain their trusted partner
            in luxury real estate.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mt-16">
          <Carousel
            plugins={[plugin.current]}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="flex basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className={`
                      relative flex h-full w-full flex-col rounded-2xl
                      border border-border bg-card p-8 shadow-sm
                      transition-all duration-300
                      hover:-translate-y-2 hover:shadow-2xl
                      ${
                        testimonial.featured
                          ? "border-t-4 border-secondary"
                          : ""
                      }
                    `}
                  >
                    {/* Quote Icon */}
                    <div className="absolute right-6 top-6">
                      <Quote size={28} className="text-secondary/40" />
                    </div>

                    {/* Quote */}
                    <p className="min-h-[180px] flex-1 italic leading-8 text-muted-foreground">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    {/* User */}
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full ring-2 ring-secondary/20">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                      </div>

                      <div>
                        <h3 className="font-montserrat font-semibold text-foreground">
                          {testimonial.name}
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop Navigation */}
            <CarouselPrevious className="-left-5 hidden border-border bg-card text-foreground lg:flex" />

            <CarouselNext className="-right-5 hidden border-border bg-card text-foreground lg:flex" />

            {/* Mobile Navigation */}
            <div className="mt-8 flex justify-center gap-4 lg:hidden">
              <CarouselPrevious className="static translate-y-0 border-border bg-card text-foreground" />

              <CarouselNext className="static translate-y-0 border-border bg-card text-foreground" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
