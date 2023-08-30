import { createAgeCalculator } from "./ageCalculator";

describe("ageCalculator", () => {
  describe("already had birthday this year", () => {
    test.each([
      {
        birthDate: new Date("1993/12/23"),
        targetDate: new Date("2023/12/24"),
        expected: 30,
      },
      {
        birthDate: new Date("1992/12/23"),
        targetDate: new Date("2023/12/24"),
        expected: 31,
      },
      {
        birthDate: new Date("2015/03/30"),
        targetDate: new Date("2022/12/24"),
        expected: 7,
      },
    ])(
      "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
      ({ birthDate, targetDate, expected }) => {
        const sut = createAgeCalculator().calculateAge;
        const actual = sut(birthDate, targetDate);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("Still expecting birthday this year", () => {
    test.each([
      {
        birthDate: new Date("1993/12/23"),
        targetDate: new Date("2023/08/30"),
        expected: 29,
      },
      {
        birthDate: new Date("1993/12/23"),
        targetDate: new Date("2023/12/21"),
        expected: 29,
      },
    ])(
      "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
      ({ birthDate, targetDate, expected }) => {
        const sut = createAgeCalculator().calculateAge;
        const actual = sut(birthDate, targetDate);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("Birthday today", () => {
    test.each([
      {
        birthDate: new Date("1993/12/23"),
        targetDate: new Date("2023/12/23"),
        expected: 30,
      },
    ])(
      "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
      ({ birthDate, targetDate, expected }) => {
        const sut = createAgeCalculator().calculateAge;
        const actual = sut(birthDate, targetDate);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("Birth in a leap year on 29/02", () => {
    test.each([
      {
        birthDate: new Date("2000/02/29"),
        targetDate: new Date("2005/02/27"),
        expected: 4,
      },
      {
        birthDate: new Date("2000/02/29"),
        targetDate: new Date("2005/03/01"),
        expected: 5,
      },
      {
        birthDate: new Date("2000/02/29"),
        targetDate: new Date("2004/02/29"),
        expected: 4,
      },
      {
        birthDate: new Date("2000/02/29"),
        targetDate: new Date("2008/02/29"),
        expected: 8,
      },
    ])(
      "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
      ({ birthDate, targetDate, expected }) => {
        const sut = createAgeCalculator().calculateAge;
        const actual = sut(birthDate, targetDate);

        expect(actual).toBe(expected);
      }
    );
  });
  describe("getBirthdayWeek", () => {
    describe("Birthday - Sun-Wed of the target year", () => {
      test.each([
        {
          birthDate: new Date("2017/09/05"),
          targetYear: 2021,
          expected: "Mon Aug 30 2021",
        },
        {
          birthDate: new Date("2017/09/12"),
          targetYear: 2023,
          expected: "Wed Sep 06 2023",
        },
        {
          birthDate: new Date("1993/03/07"),
          targetYear: 2023,
          expected: "Wed Mar 01 2023",
        },
      ])(
        "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
        ({ birthDate, targetYear, expected }) => {
          const sut = createAgeCalculator().getBirthdayWeek;

          const actual = sut(birthDate, targetYear);

          expect(actual).toBe(expected);
        }
      );
    });
    describe("Birthday - Thu-Sat of the target year", () => {
      test.each([
        {
          birthDate: new Date("2017/09/04"),
          targetYear: 2021,
          expected: "Sun Aug 29 2021",
        },
        {
          birthDate: new Date("1993/03/10"),
          targetYear: 2023,
          expected: "Sun Mar 05 2023",
        },
      ])(
        "birthDate: $birthDate, targetDate: $targetDate, expected: $expected",
        ({ birthDate, targetYear, expected }) => {
          const sut = createAgeCalculator().getBirthdayWeek;

          const actual = sut(birthDate, targetYear);

          expect(actual).toBe(expected);
        }
      );
    });
  });
});
