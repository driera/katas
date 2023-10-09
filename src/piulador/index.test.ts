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

  it("allows user to follow someone else", () => {
    const piulador = new Piulador();
    piulador.register("Alice");
    piulador.register("Charlie");

    piulador.followTo("Charlie", "Alice");

    expect(piulador.getFollowers("Alice")).toStrictEqual(["Charlie"]);
  });

  it("user can read its feed", () => {
    const piulador = new Piulador();
    piulador.register("Alice");
    piulador.register("Bob");
    piulador.register("Charlie");

    const firstMessage = "piu from Alice!";
    piulador.writeMessage("Alice", firstMessage);
    const secondMessage = "a piu from Bob!";
    piulador.writeMessage("Bob", secondMessage);

    piulador.followTo("Charlie", "Alice");
    piulador.followTo("Charlie", "Bob");

    expect(piulador.readFeed("Charlie")).toStrictEqual([
      secondMessage,
      firstMessage
    ]);
  });
});
