import {
  findCheapest,
  findCombinations,
  findOptimal,
  getCombinationPrice,
} from ".";

describe("Measure", () => {
  it("Returns all combinations that fit inside a wall", () => {
    const wallLength = 150;
    const combinations = findCombinations(wallLength);

    expect(combinations).toEqual([
      [50],
      [50, 50],
      [50, 50, 50],
      [50, 75],
      [50, 100],
      [75],
      [75, 75],
      [100],
      [120],
    ]);
  });

  it("Returns the combinations that leave less free space", () => {
    const wallLength = 160;
    const combinations = findCombinations(wallLength);
    const optimalCombinations = findOptimal(combinations, wallLength);

    expect(optimalCombinations).toEqual([
      [50, 50, 50],
      [50, 100],
      [75, 75],
    ]);
  });

  it("Returns the cheapest combination that leaves less free space", () => {
    const wallLength = 250;
    const combinations = findCombinations(wallLength);
    const optimalCombinations = findOptimal(combinations, wallLength);
    const cheapestCombinations = findCheapest(optimalCombinations);

    expect(cheapestCombinations).toEqual([75, 75, 100]);
  });
});

it("returns a price given a combination of elements", () => {
  const elements = [50, 50, 75];
  const price = getCombinationPrice(elements);

  expect(price).toEqual(180);
});
