const elements = [50, 75, 100, 120];
const prices = [59, 62, 90, 111];

type Combination = number[];

export const findCombinations = (wallLength: number): Combination[] => {
  const combinations: Combination[] = [];

  const iterateElements = (
    start: number,
    remainingLength: number,
    combination: Combination
  ) => {
    for (let i = start; i < elements.length; i++) {
      const element = elements[i];
      if (element <= remainingLength) {
        combinations.push([...combination, element]);
        iterateElements(i, remainingLength - element, [
          ...combination,
          element,
        ]);
      }
    }
  };

  iterateElements(0, wallLength, []);
  return combinations;
};

export const findOptimal = (
  combinations: Combination[],
  wallLength: number
): Combination[] => {
  let optimal: Combination[] = [];
  let remaining = wallLength;

  combinations.forEach((combination) => {
    const combinationLength = combination.reduce((acc, val) => acc + val, 0);
    if (wallLength - combinationLength < remaining) {
      remaining = wallLength - combinationLength;
      optimal = [combination];
    } else if (wallLength - combinationLength === remaining)
      optimal.push(combination);
  });

  return optimal;
};

export const findCheapest = (combinations: Combination[]): Combination => {
  const combinationPrices = combinations.map((combination) =>
    getCombinationPrice(combination)
  );
  let cheapestIndex = 0;

  combinationPrices.forEach((price, index) => {
    if (price < combinationPrices[cheapestIndex]) {
      cheapestIndex = index;
    }
  });

  return combinations[cheapestIndex];
};

export const getCombinationPrice = (combination: Combination): number => {
  return combination
    .map((elementSize) => prices[elements.indexOf(elementSize)])
    .reduce((acc, value) => {
      return acc + value;
    }, 0);
};
