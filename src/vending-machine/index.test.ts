import { Vending } from ".";

describe("Vending machine", () => {
  it("shows ìnsert coin`when no coins have been inserted", () => {
    const vending = new Vending();

    expect(vending.display()).toBe("insert coin");
  });

  it("accepts multiple valid coins", () => {
    const vending = new Vending();
    const aValidCoin = {
      weight: 2,
      diameter: 2,
    };

    vending.insertCoin(aValidCoin);
    vending.insertCoin(aValidCoin);

    expect(vending.display()).toBe("4€");
  });

  it("returns invalid coins", () => {
    const vending = new Vending();
    const invalidCoin = { weight: 1.5, diameter: 2.5 };

    vending.insertCoin(invalidCoin);

    expect(vending.display()).toBe("insert coin");
    expect(vending.return()).toBe(invalidCoin);
  });
});
