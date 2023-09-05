import { Copier, Destination, Source } from "./characterCopy";

describe("character-copy", () => {
  describe("copy", () => {
    describe("no character before a new line", () => {
      test("destination writer should not be called", () => {
        const source = createSource();
        const destination = createDestination();
        const sut = createCopier(source, destination);

        sut.copy();

        expect(destination.writeChar).toHaveBeenCalledTimes(0);
      });
    });
    describe("one character with newline", () => {
      test.each([{ char: "a" }, { char: "b" }, { char: "!" }])(
        "char: $char",
        ({ char }) => {
          const source = createSource([char]);
          const destination = createDestination();

          const sut = createCopier(source, destination);

          sut.copy();

          expect(destination.getWrittenChars()).toContain(char);
        }
      );
    });
    describe("multiple characters with newline", () => {
      test.each([
        { chars: ["a", "b", "c"] },
        { chars: ["a", "a", "c", "!"] },
        { chars: ["z", "s", "#"] },
      ])("char: $char", ({ chars }) => {
        const source = createSource(chars);
        const destination = createDestination();

        const sut = createCopier(source, destination);

        sut.copy();

        chars.map((c) => expect(destination.getWrittenChars()).toContain(c));
      });
    });
    describe("multiple characters verify writing order", () => {
      test.each([{ chars: ["s", "a", "b", "c", "z"] }])(
        "char: $char",
        ({ chars }) => {
          const source = createSource(chars);
          const destination = createDestination();

          const sut = createCopier(source, destination);

          sut.copy();

          expect(destination.getWrittenChars()).toStrictEqual(chars);
        }
      );
    });
    describe("characters after a new line are not written", () => {
      test.each([
        { chars: ["s", "c", "z", "\n", "!", "x"], expected: ["s", "c", "z"] },
      ])("char: $char", ({ chars, expected }) => {
        const source = createSource(chars);
        const destination = createDestination();

        const sut = createCopier(source, destination);

        sut.copy();

        expect(destination.getWrittenChars()).toStrictEqual(expected);
      });
    });
  });
});

function createSource(chars: string[] | null = null) {
  const mockedReadChar = jest.fn();
  mockedReadChar.mockReturnValue("\n");
  if (chars) {
    chars.forEach((element) => {
      mockedReadChar.mockReturnValueOnce(element);
    });
  }
  return {
    readChar: mockedReadChar,
  };
}

function createDestination() {
  const writtenChars: string[] = [];
  return {
    writeChar: jest.fn((char) => writtenChars.push(char)),
    getWrittenChars: () => writtenChars,
  };
}

function createCopier(source: Source, destination: Destination) {
  return new Copier(source, destination);
}
