import { propertyQuerySchema } from "./property-schema";
import { budgetOptions } from "./budgets";

/** Normalizes the HTML search form into the same filters accepted by the property API. */
export function parsePropertySearch(query: Record<string, string>) {
  const { budget, ...rest } = query;
  const range = budgetOptions.find((option) => option.value === budget);
  if (budget && !range) return { success: false as const, error: "Invalid budget range." };
  const parsed = propertyQuerySchema.safeParse({
    ...rest,
    ...(range && { minPrice: range.min, maxPrice: range.max }),
  });
  if (!parsed.success) return { success: false as const, error: "Check your filters and try again." };
  return { success: true as const, data: parsed.data };
}
