import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Montserrat, Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description: "Explore residential and commercial properties and discuss your requirements with Extrovate Solutions LLP.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: site.name, title: site.name, description: "Property guidance built around your needs.", images: ["/hero.svg"] },
  twitter: { card: "summary_large_image", title: site.name, images: ["/hero.svg"] },
};

// app/layout.tsx

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${montserrat.variable}  h-full `}
    >
      <body className="min-h-full flex flex-col font-inter antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:rounded focus:bg-background focus:p-4">Skip to content</a>
          <Header />
          <main id="main-content" className="flex-1" tabIndex={-1}>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
