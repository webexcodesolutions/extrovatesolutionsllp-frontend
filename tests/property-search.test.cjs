// eslint-disable-next-line @typescript-eslint/no-require-imports
const test = require("node:test");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert = require("node:assert/strict");
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { parsePropertySearch } = require("../src/lib/property-search.ts");

test("homepage search preserves city and type and applies budget bounds", () => {
  const result = parsePropertySearch({ city: "Mumbai", propertyType: "Villa", budget: "1-3cr" });
  assert.equal(result.success, true);
  assert.deepEqual(result.data, { page: 1, limit: 9, city: "Mumbai", propertyType: "Villa", minPrice: 10_000_000, maxPrice: 30_000_000, featured: false });
});

test("open-ended budget leaves maximum unset", () => {
  const result = parsePropertySearch({ budget: "above-10cr" });
  assert.equal(result.success, true);
  assert.equal(result.data.minPrice, 100_000_000);
  assert.equal(result.data.maxPrice, undefined);
});

test("rejects unknown budget and inverted manual bounds", () => {
  assert.equal(parsePropertySearch({ budget: "invented" }).success, false);
  assert.equal(parsePropertySearch({ minPrice: "500", maxPrice: "100" }).success, false);
});
