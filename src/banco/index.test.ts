it.skip("return the interest", () => {
  const loans = getLoans();

  expect(loans).toEqual([
    {
      name: "Personal",
      interest: 4
    },
    {
      name: "Collateral",
      interest: 3
    },
    {
      name: "Payroll",
      interest: 2
    }
  ]);
});

it.skip("allows to create a user", () => {
  const user = createUser("César", 29, 4000, "Valencia");

  expect(user).toEqual({
    name: "César",
    age: 29,
    income: 4000,
    residence: "Valencia"
  });
});

describe("Banco", () => {
  const collateralLoal = { name: "Collateral", interest: 3 };
  const personalLoan = { name: "Personal", interest: 4 };
  const payrollLoan = { name: "Super nómina", interest: 2 };

  it("returns personal loan when income is under 3000", () => {
    const user = createUser("Lluis", 29, 2000, "Alboraia");

    const loans = calculateLoans(user);

    expect(loans).toEqual(personalLoan);
  });

  it("returns payroll loan when income is above 5000", () => {
    const user = createUser("Lluis", 29, 5000, "Alboraia");

    const loans = calculateLoans(user);

    expect(loans).toEqual(payrollLoan);
  });

  it("returns collateralized loan when income is above 3000 and live in Valencia", () => {
    const user = createUser("Lluis", 29, 3100, "Valencia");

    const loans = calculateLoans(user);

    expect(loans).toEqual(collateralLoal);
  });

  it("returns collateralized loan when income is above 3000 and live in Alboraia", () => {
    const user = createUser("Lluis", 29, 3100, "Alboraia");

    const loans = calculateLoans(user);

    expect(loans).toEqual(personalLoan);
  });
});

type Loan = {
  name: string;
  interest: number;
};

const getLoans = (): { [name: string]: Loan } => {
  return {
    personal: {
      name: "Personal",
      interest: 4
    },
    collateral: {
      name: "Collateral",
      interest: 3
    },
    payroll: {
      name: "Super nómina",
      interest: 2
    }
  };
};

type User = {
  name: string;
  age: number;
  income: number;
  residence: string;
};

const createUser = (
  name: string,
  age: number,
  income: number,
  residence: string
): User => ({
  name,
  age,
  income,
  residence
});

const calculateLoans = (user: User): Loan => {
  if (user.income >= 5000) {
    return getLoans().payroll;
  }

  if (user.income > 3000 && user.residence === "Valencia") {
    return getLoans().collateral;
  }

  return getLoans().personal;
};
