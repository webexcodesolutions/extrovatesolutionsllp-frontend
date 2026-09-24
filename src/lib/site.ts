/** Only publish business claims once verified. Empty optional values hide their UI. */
export const site = {
  name: "Extrovate Solutions LLP",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "",
  address: process.env.NEXT_PUBLIC_OFFICE_ADDRESS || "",
  foundedYear: process.env.NEXT_PUBLIC_FOUNDED_YEAR || "",
  brochureUrl: process.env.NEXT_PUBLIC_BROCHURE_URL || "",
  filmUrl: process.env.NEXT_PUBLIC_FILM_URL || "",
};
