/*
Rules
1. StrictlypracticeTDD:Red,Green,Refactor
2. No use of the debugger or any console writes are allowed.
2.1. Make use of a learning test to focus on the troublesome code.

The Kata

1. Create a simple String calculator with the signature: function add(input: string): number
1.1. The method can take 0, 1 or 2 numbers, and will return their sum (for an empty string it
will return 0) for example “” or “1” or “1,2”
1.2. Start with the simplest test case of an empty string, then move to one and two numbers
2. Allow the add() function to handle an unknown amount of numbers
3. Allow the add() function to handle new lines between numbers (in addition to commas).
3.1. the following input is ok: “1\n2,3” (will equal 6)
3.2. the following input DOES NOT need to be handled: “1,\n” (not need to prove it - just
clarifying)

4. Supportdifferentdelimiters
4.1. To change a delimiter, the beginning of the string will contain a separate line specifying the custom delimiter. This input looks like this: “//{delimiter}\n{numbers...}” (Note that the curly braces 
are representing the sections of the input and are not input formatting).
4.2. For example: “//;\n1;2” should return a result of 3 because the delimiter is now ‘;’.
4.3. The first line is optional (all existing scenarios should still be supported).
4.4. Do not worry about supporting the specification of ‘\n’ as an explicit custom delimiter.
New lines should always be supported as delimiters in your number string.
5. Calling add() with a negative number in the input will throw an exception “negatives not
allowed” - and the negative that was passed, if there are multiple negatives, show all of
them in the exception message
6. Numbers bigger than 1000 should be ignored, so adding 2 + 1001 = 2

*/

import { StringCalculator } from "./stringCalculator";

describe("String Calculator", () => {
  test("Add returns 0 when empty string is given", () => {
    const input = "";
    const expected = 0;
    const sut = new StringCalculator();

    const actual = sut.add(input);

    expect(actual).toBe(expected);
  });

  describe("Single digit", () => {
    test.each([
      { input: "1", expected: 1 },
      { input: "5", expected: 5 },
      { input: "0", expected: 0 },
    ])("Given input: $input should return $expected", ({ input, expected }) => {
      const sut = new StringCalculator();

      const actual = sut.add(input);

      expect(actual).toBe(expected);
    });
  });
  describe("Splitted by a comma", () => {
    describe("Two numbers", () => {
      test.each([
        { input: "1,33", expected: 34 },
        { input: "2,2", expected: 4 },
        { input: "9,0", expected: 9 },
      ])(
        "Given input: $input should return $expected",
        ({ input, expected }) => {
          const sut = new StringCalculator();

          const actual = sut.add(input);

          expect(actual).toBe(expected);
        }
      );
    });
    describe("Multiple digits", () => {
      test.each([
        { input: "1,3,5,7,19", expected: 35 },
        { input: "2,2,0,0,100", expected: 104 },
        { input: "9,0,9,3,1", expected: 22 },
      ])(
        "Given input: $input should return $expected",
        ({ input, expected }) => {
          const sut = new StringCalculator();

          const actual = sut.add(input);

          expect(actual).toBe(expected);
        }
      );
    });
  });
  describe("Splitted by a new line and comma", () => {
    test.each([
      { input: "1\n3,5", expected: 9 },
      { input: "2\n2", expected: 4 },
      { input: "9\n0,5\n2", expected: 16 },
    ])("Given input: $input should return $expected", ({ input, expected }) => {
      const sut = new StringCalculator();

      const actual = sut.add(input);

      expect(actual).toBe(expected);
    });
  });
  describe("extractDelimiter", () => {
    test.each([
      { input: "//;\n1;3;5", expected: ";" },
      { input: "//-\n1-3-5,10\n55", expected: "-" },
      { input: "//x\n1x3x5x10x55", expected: "x" },
    ])(
      "Given input: $input should return delimiter: $expected)",
      ({ input, expected }) => {
        const sut = new StringCalculator();

        const actual = sut.extractDelimiterIfExist(input);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("Splitted by a custom delimiter", () => {
    test.each([
      { input: "//;\n1;3;5", expected: 9 },
      { input: "//-\n9\n0-5\n2", expected: 16 },
      { input: "//@\n9\n0@5\n2,100@100", expected: 216 },

    ])("Given input: $input should return $expected", ({ input, expected }) => {
      const sut = new StringCalculator();

      const actual = sut.add(input);

      expect(actual).toBe(expected);
    });
  });
  describe("Add should throw error when negative number is given", () => {
    test("single negative number", () => {
      const input = "//;\n1;3;5;-4";
      const expected = "negatives not allowed: -4";
      const sut = new StringCalculator();

      const wrapAround = () => {
        sut.add(input);
      };

      expect(wrapAround).toThrowError(expected);
    });
    test("Multiple negative numbers should be visible in error message", () => {
      const input = "//;\n1;3;5;-4,-5,-10,-22";
      const expected = "negatives not allowed: -4,-5,-10,-22";
      const sut = createSut();

      const wrapAround = () => {
        sut.add(input);
      };

      expect(wrapAround).toThrowError(expected);
    });
  });
  describe("Numbers bigger than 1000 should be skipped", () => {
    test.each([
      { input: "//;\n1;3;5;10000", expected: 9 },
      { input: "//-\n9\n0-5\n2,22222", expected: 16 },

    ])("Given input: $input should return $expected", ({ input, expected }) => {
      const sut = new StringCalculator();

      const actual = sut.add(input);

      expect(actual).toBe(expected);
    });
  });
});
function createSut() {
  return new StringCalculator();
}
