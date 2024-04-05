describe("Bowling", () => {
  it("starts at frame 1", () => {
    const game = new Bowling();

    expect(game.getCurrentFrame()).toBe(1);
  });

  it("throwing 2 times passes to next frame", () => {
    const game = new Bowling();

    game.throwing(5);
    game.throwing(5);

    expect(game.getCurrentFrame()).toBe(2);
  });

  it("returns result per frame", () => {
    const game = new Bowling();

    game.throwing(5);
    game.throwing(3);

    expect(game.getResult()).toStrictEqual([8, 0]);
  });

  it("returns total score", () => {
    const game = new Bowling();

    game.throwing(5);
    game.throwing(3);

    expect(game.getTotalScore()).toStrictEqual(8);
  });
});

class Bowling {
  frames: Frame[];
  currentFrame: number;
  result: number[];

  constructor() {
    this.frames = [new Frame()];
    this.currentFrame = 1;
    this.result = [0];
  }

  throwing(pins: number) {
    const frame = this.frames[this.currentFrame - 1];

    frame.throwing(pins);
    this.result[this.currentFrame - 1] = frame.getThrownPins();

    if (frame.getRemainingThrows() === 0) {
      this.advanceFrame();
    }
  }

  getCurrentFrame() {
    return this.currentFrame;
  }

  getResult() {
    return this.result;
  }

  getTotalScore() {
    return this.result.reduce((acc, score) => acc + score, 0);
  }

  private advanceFrame() {
    this.result.push(0);
    this.frames.push(new Frame());
    this.currentFrame++;
  }
}

class Frame {
  private pins: number;
  private remainingThrows: number;

  constructor() {
    this.pins = 0;
    this.remainingThrows = 2;
  }

  throwing(pins: number) {
    this.remainingThrows--;
    this.pins += pins;
  }

  getRemainingThrows() {
    return this.remainingThrows;
  }

  getThrownPins() {
    return this.pins;
  }
}
