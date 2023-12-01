import { Piulador } from ".";

describe("Piulador", () => {
  it("allows to login an user", () => {
    const piulador = new Piulador();
    const userData = { id: "Alice", email: "alice@mail.com" };
    piulador.register(userData);

    const alice = piulador.login("Alice");

    expect(alice.getTimeline()).toStrictEqual([]);
  });

  it("user can write a message", () => {
    const piulador = new Piulador();
    const userData = { id: "Alice", email: "alice@mail.com" };
    piulador.register(userData);

    const alice = piulador.login("Alice");
    const message = "My first message!";
    alice.write(message);

    expect(alice.getTimeline()).toStrictEqual([message]);
  });

  it("timeline returns most recent messages first", () => {
    const piulador = new Piulador();
    const userData = { id: "Alice", email: "alice@mail.com" };
    piulador.register(userData);

    const alice = piulador.login("Alice");
    const message = "My first message!";
    alice.write(message);
    const secondMessage = "My second message!";
    alice.write(secondMessage);

    expect(alice.getTimeline()).toStrictEqual([secondMessage, message]);
  });
});
