"use client";

import Image from "next/image";
import { Quote } from "lucide-react";



import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { testimonials } from "@/lib/approved-content";

export default function TestimonialsSection() {
  if (!testimonials.length) return null;

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
                          sizes="56px"
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
