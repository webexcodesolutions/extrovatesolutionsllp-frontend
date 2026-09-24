import Image from "next/image";

import { leaders } from "@/lib/approved-content";

export function Leadership() {
  if (!leaders.length) return null;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        {/* Header */}
        <div className="mx-auto max-w-[650px] text-center">
          <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.5px] text-foreground sm:text-[32px]">
            Leadership at the Helm
          </h2>

          <p className="mt-3 text-sm leading-[1.6] text-muted-foreground sm:text-[12px]">
            Our leadership team brings together decades of expertise in
            architecture, finance, and
            <br className="hidden sm:block" />
            urban development.
          </p>
        </div>

        {/* Team */}
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <LeaderCard key={leader.name} {...leader} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LeaderCard({ name, role, image }: Leader) {
  return (
    <article className="group">
      {/* Portrait */}
      <div className="relative aspect-[0.91/1] overflow-hidden bg-muted">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-[1.02]"
        />
      </div>

      {/* Details */}
      <div className="pt-3">
        <h3 className="text-[16px] font-semibold leading-5 text-foreground">
          {name}
        </h3>

        <p className="mt-1.5 text-xs font-semibold uppercase tracking-[1px] text-secondary">
          {role}
        </p>
      </div>
    </article>
  );
}
