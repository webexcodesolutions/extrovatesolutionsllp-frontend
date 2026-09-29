"use client";

import { useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Quote } from "lucide-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { testimonials as approvedTestimonials } from "@/lib/approved-content";
import { demoTestimonials } from "@/lib/demo-testimonials";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(reducedMotionQuery);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotionPreference() {
  return window.matchMedia(reducedMotionQuery).matches;
}

export default function TestimonialsSection() {
  const isSample = approvedTestimonials.length === 0;
  const testimonials = isSample ? demoTestimonials : approvedTestimonials;
  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionPreference,
    () => false,
  );
  const [autoplay] = useState(() =>
    Autoplay({
      delay: 5000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    }),
  );

  return (
    <section className="bg-muted py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="eyebrow">Client perspectives</p>
          <h2 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
            Stories of Satisfaction
          </h2>
          {isSample && (
            <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
              Sample testimonials for layout preview. These are not verified client endorsements.
            </p>
          )}
        </div>

        <Carousel
          opts={{ align: "start", loop: testimonials.length > 1, slidesToScroll: 1 }}
          plugins={reducedMotion || testimonials.length < 2 ? [] : [autoplay]}
          tabIndex={0}
          aria-label={isSample ? "Sample testimonial carousel" : "Client testimonial carousel"}
          className="mt-10 outline-none focus-visible:ring-2 focus-visible:ring-secondary"
        >
          <CarouselContent className="-ml-4 pb-4">
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="basis-[92%] pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <blockquote
                  className={`flex h-full min-h-64 flex-col border bg-card p-7 shadow-sm ${
                    testimonial.featured ? "border-t-4 border-t-secondary" : "border-border"
                  }`}
                >
                  <Quote size={25} aria-hidden="true" className="ml-auto text-secondary/50" />
                  <p className="mt-3 flex-1 text-sm leading-6 text-foreground/80">
                    “{testimonial.quote}”
                  </p>
                  <footer className="mt-7 flex items-center gap-3">
                    <Image
                      src={testimonial.image}
                      alt=""
                      width={44}
                      height={44}
                      className="size-11 rounded-full object-cover"
                    />
                    <div>
                      <cite className="not-italic text-sm font-semibold text-primary">
                        {testimonial.name}
                      </cite>
                      <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </footer>
                </blockquote>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-4 flex justify-center gap-3">
            <CarouselPrevious
              className="static size-10 translate-y-0 border-primary/20 bg-card text-primary"
              aria-label="Previous testimonial"
            />
            <CarouselNext
              className="static size-10 translate-y-0 border-primary/20 bg-card text-primary"
              aria-label="Next testimonial"
            />
          </div>
        </Carousel>
      </div>
    </section>
  );
}
