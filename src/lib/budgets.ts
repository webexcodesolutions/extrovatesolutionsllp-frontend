/** Values are stored as INR, matching property prices in the API. */
export const budgetOptions = [
  { label: "Under ₹1 Cr", value: "under-1cr", min: 0, max: 10_000_000 },
  { label: "₹1 Cr – ₹3 Cr", value: "1-3cr", min: 10_000_000, max: 30_000_000 },
  { label: "₹3 Cr – ₹5 Cr", value: "3-5cr", min: 30_000_000, max: 50_000_000 },
  { label: "₹5 Cr – ₹10 Cr", value: "5-10cr", min: 50_000_000, max: 100_000_000 },
  { label: "Above ₹10 Cr", value: "above-10cr", min: 100_000_000, max: undefined },
] as const;
