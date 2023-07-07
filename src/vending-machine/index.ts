type Coin = {
  weight: number;
  diameter: number;
};

const coinCollection: Record<string, { amount: number }> = {
  "2,2": {
    amount: 2,
  },
};

export class Vending {
  amount;
  coinToReturn: Coin | null = null;

  constructor() {
    this.amount = 0;
  }

  display() {
    if (this.amount === 0) return "insert coin";

    return `${this.amount}€`;
  }

  insertCoin(coin: Coin) {
    const validCoin = coinCollection[`${coin.weight},${coin.diameter}`];

    if (validCoin) {
      this.amount += validCoin.amount;
      return;
    } else {
      this.coinToReturn = coin;
      this.return();
    }
  }

  return() {
    return this.coinToReturn;
  }
}
