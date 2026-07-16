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
    <section className="bg-[#F8F8F8] py-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[4px] text-[#C6A128]">
            CLIENT PERSPECTIVES
          </p>

          <h2 className="mt-4 text-4xl font-bold text-[#123A54] md:text-5xl">
            Stories of Satisfaction
          </h2>
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
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <div
                    className={`relative h-full rounded-lg bg-white p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                      testimonial.featured ? "border-t-4 border-[#C6A128]" : ""
                    }`}
                  >
                    {/* Quote Icon */}
                    <div className="absolute right-6 top-6">
                      <Quote size={28} className="text-[#C6A128]/40" />
                    </div>

                    {/* Quote */}
                    <p className="min-h-[180px] text-gray-600 italic leading-8">
                      &quot;{testimonial.quote}&quot;
                    </p>

                    {/* User */}
                    <div className="mt-8 flex items-center gap-4">
                      <div className="relative h-14 w-14 overflow-hidden rounded-full">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      <div>
                        <h3 className="font-semibold text-[#123A54]">
                          {testimonial.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Desktop */}
            <CarouselPrevious className="-left-6 hidden lg:flex" />
            <CarouselNext className="-right-6 hidden lg:flex" />

            {/* Mobile */}
            <div className="mt-8 flex justify-center gap-4 lg:hidden">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
