import Image from "next/image";

type Leader = {
  name: string;
  role: string;
  image: string;
};

const leaders: Leader[] = [
  {
    name: "Julian V. Extrovate",
    role: "Managing Partner & Founder",
    image: "/images/julian-extrovate.jpg",
  },
  {
    name: "Elena Sterling",
    role: "Chief Architectural Officer",
    image: "/images/elena-sterling.jpg",
  },
  {
    name: "Marcus Thorne",
    role: "Head of Global Investments",
    image: "/images/marcus-thorne.jpg",
  },
];

export function Leadership() {
  return (
    <section className="bg-[#faf9f7]">
      <div className="mx-auto max-w-[1280px] px-5 py-14 sm:px-8 lg:px-10 lg:py-16">
        {/* Header */}
        <div className="mx-auto max-w-[650px] text-center">
          <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.5px] text-[#164b66] sm:text-[32px]">
            Leadership at the Helm
          </h2>

          <p className="mt-3 text-[11px] leading-[1.6] text-[#555] sm:text-[12px]">
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
      <div className="relative aspect-[0.91/1] overflow-hidden bg-[#e5e5e5]">
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
        <h3 className="text-[16px] font-semibold leading-5 text-[#164b66]">
          {name}
        </h3>

        <p className="mt-1.5 text-[9px] font-semibold uppercase tracking-[1px] text-[#c5a021]">
          {role}
        </p>
      </div>
    </article>
  );
}
