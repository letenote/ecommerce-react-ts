import { idrFormater } from "./IdrFormater";

describe("__IDR_FORMATER_TEST_SCENARIO", () => {
  test("scenario 1", () => {
    const expectedValue = "Rp 200.000"
    expect(idrFormater(200000)).toBe(expectedValue)
  });

  test("scenario 2", () => {
    const expectedValue = "Rp 0"
    expect(idrFormater()).toBe(expectedValue)
  });
})