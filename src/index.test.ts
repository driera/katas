import { wadus } from ".";

describe("Wadus", () => {
  it("Returns all combinations that fit inside a wall", () => {
    const foo = wadus();
    expect(foo).toBe("wadus");
  });
});
