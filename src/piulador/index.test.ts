import { Piulador } from ".";

describe("Piulador", () => {
  it("allows registered users to have a timeline", () => {
    const piulador = new Piulador();

    piulador.register("Alice");

    expect(piulador.readTimeline("Alice")).toStrictEqual([]);
  });

  it("allows to write messages to your timeline", () => {
    const piulador = new Piulador();
    piulador.register("Alice");

    const firstMessage = "My first piu!";
    piulador.writeMessage("Alice", firstMessage);
    const secondMessage = "My second piu!";
    piulador.writeMessage("Alice", secondMessage);

    expect(piulador.readTimeline("Alice")).toStrictEqual([
      firstMessage,
      secondMessage
    ]);
  });
});
