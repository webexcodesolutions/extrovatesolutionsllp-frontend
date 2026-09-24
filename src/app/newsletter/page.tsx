import type { Metadata } from "next";
import NewsletterAction from "./subscription-action";
export const metadata: Metadata = { title: "Manage subscription", robots: { index: false, follow: false } };
export default async function NewsletterPage({ searchParams }: { searchParams: Promise<{ token?: string; action?: string }> }) {
  const { token, action } = await searchParams;
  if (!token || !["confirm", "unsubscribe"].includes(action || "")) return <p className="p-10">Open the subscription link from your email.</p>;
  return <NewsletterAction token={token} action={action as "confirm" | "unsubscribe"} />;
}
