import { sumOfNumbers } from "./sumOfNumbers";

describe("__SUM_OF_NUMBER_TEST_SCENARIO", () => {
  test("scenario 1", () => {
    const expectedValue = 200000;
    const dummy = [
      { price: 120000 },
      { price: 80000 }
    ]
    expect(sumOfNumbers(dummy)).toBe(expectedValue)
  });

  test("scenario 2", () => {
    const expectedValue = 510000
    const dummy = [
      { price: 10000 },
      { price: 10000 },
      { price: 10000 },
      { price: 10000 },
      { price: 60000 },
      { price: 5000 },
      { price: 5000 },
      { price: 200000 },
      { price: 200000 },
    ]
    expect(sumOfNumbers(dummy)).toBe(expectedValue)
  });
})