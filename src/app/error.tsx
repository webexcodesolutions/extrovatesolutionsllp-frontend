"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <section className="mx-auto max-w-3xl px-6 py-20"><h1 className="text-3xl font-semibold">Temporarily unavailable</h1><p className="mt-4">We couldn’t load this page. Please try again shortly.</p><button onClick={reset} className="mt-6 rounded-md bg-primary px-6 py-3 text-primary-foreground">Try again</button></section>;
}
