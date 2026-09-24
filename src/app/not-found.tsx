import Link from "next/link";
export default function NotFound() { return <section className="mx-auto max-w-3xl px-6 py-20"><h1 className="text-3xl font-semibold">Page not found</h1><p className="mt-4">This page or property is no longer available.</p><Link className="mt-6 inline-flex min-h-11 items-center underline" href="/projects">Browse properties</Link></section>; }
