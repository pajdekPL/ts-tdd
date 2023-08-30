import { createFizzBuzz } from "./fizzBuzz";

describe("FizzBuzz", () => {
  describe("Fizz", () => {
    test.each([{ input: 12 }, { input: 6 }, { input: 9 }])(
      "input: $input",
      ({ input }) => {
        const expected = "Fizz";
        const sut = createFizzBuzz();

        const actual = sut.go(input);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("Buzz", () => {
    test.each([{ input: 25 }, { input: 10 }, { input: 20 }])(
      "input: $input",
      ({ input }) => {
        const expected = "Buzz";
        const sut = createFizzBuzz();

        const actual = sut.go(input);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("FizzBuzz", () => {
    test.each([{ input: 15 }, { input: 30 }, { input: 45 }])(
      "input: $input",
      ({ input }) => {
        const expected = "FizzBuzz";
        const sut = createFizzBuzz();

        const actual = sut.go(input);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("Whiz", () => {
    test.each([{ input: 2 }, { input: 7 }, { input: 67 }])(
      "input: $input",
      ({ input }) => {
        const expected = "Whiz";
        const sut = createFizzBuzz();

        const actual = sut.go(input);

        expect(actual).toBe(expected);
      }
    );
  });

  describe("FizzWhiz", () => {
    test.each([{ input: 3 }])("input: $input", ({ input }) => {
      const expected = "FizzWhiz";
      const sut = createFizzBuzz();

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });
  describe("BuzzWhiz", () => {
    test.each([{ input: 5 }])("input: $input", ({ input }) => {
      const expected = "BuzzWhiz";
      const sut = createFizzBuzz();

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });
  describe("Just numbers not divided by 3 or 5", () => {
    test.each([
      { input: 1, expected: "1" },
      { input: 8, expected: "8" },
      { input: 4, expected: "4" },
      { input: 28, expected: "28" },
    ])("input: $input expected $expected", ({ input, expected }) => {
      const sut = createFizzBuzz();

      const actual = sut.go(input);

      expect(actual).toBe(expected);
    });
  });
  describe("Prime numbers", () => {
    test("calculatePrimes works properly for maxNum = 30", () => {
      const input = 30;
      const expected = new Set([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]);
      const sut = createFizzBuzz();

      const actual = sut.calculatePrimes(input);

      console.log(actual);
      expect(actual).toStrictEqual(expected);
    });
  });
});
