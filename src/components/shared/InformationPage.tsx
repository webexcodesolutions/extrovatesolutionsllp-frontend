import Link from "next/link";
export default function InformationPage({ title, children }: { title: string; children: React.ReactNode }) {
  return <article className="mx-auto max-w-3xl px-6 py-14"><h1 className="text-4xl font-bold">{title}</h1><div className="mt-8 space-y-6 leading-7 text-muted-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_a]:underline">{children}</div><Link href="/contact-us" className="mt-10 inline-flex min-h-11 items-center rounded-md bg-primary px-6 text-primary-foreground">Contact our team</Link></article>;
}
