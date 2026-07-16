import Image from "next/image";
import Link from "next/link";
export default function Header() {
  return (
    <header className="w-full bg-[#F5F5F5] border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              className=" p-5 rounded-lg"
              src="/logo.svg"
              alt="extrovatesolutionsllp logo"
              width={200}
              height={500}
              priority
            />
          </Link>

          {/* If you don't have logo image, use text */}
          {/* <div>
            <h1 className="text-3xl font-bold text-[#1E445C] tracking-wide">
              EXTROVATE
            </h1>
            <p className="text-sm text-[#C49A3A] tracking-[4px]">
              SOLUTIONS LLP
            </p>
          </div> */}
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          <Link
            href="/"
            className="text-gray-700 font-semibold hover:text-[#1E445C] transition"
          >
            HOME
          </Link>

          <Link
            href="/about-us"
            className="text-gray-700 font-semibold hover:text-[#1E445C] transition"
          >
            ABOUT US
          </Link>

          <a
            href="/projects"
            className="text-[#1E445C] font-semibold border-[#1E445C] pb-1"
          >
            PROJECTS
          </a>

          <a
            href="/contact-us"
            className="text-gray-700 font-semibold hover:text-[#1E445C] transition"
          >
            CONTACT
          </a>
        </nav>

        {/* CTA Button */}
        <button className="bg-[#123A54] text-white px-8 py-4 font-semibold hover:bg-[#0E3046] transition duration-300">
          Enquire Now
        </button>
      </div>
    </header>
  );
}
