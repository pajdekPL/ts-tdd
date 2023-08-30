import { createRockPaperScissors, Move, Outcome } from "./rockPaperScissors";

describe("Rock Paper Scissors", () => {
  describe("Moves", () => {
    it("should only contain Paper, Rock, Scissors", () => {
      const expected = `
    {
      "Paper": "PAPER",
      "Rock": "ROCK",
      "Scissors": "SCISSORS",
    }
    `;

      const actual = Move;

      expect(actual).toMatchInlineSnapshot(expected);
    });
  });
  describe("play", () => {
    describe("The same moves result in draw", () => {
      it.each([
        [[Move.Scissors, Move.Scissors] as [Move, Move], Outcome.Tie],
        [[Move.Paper, Move.Paper] as [Move, Move], Outcome.Tie],
        [[Move.Rock, Move.Rock] as [Move, Move], Outcome.Tie],
      ])("moves: %p", (input: [Move, Move], expected: Outcome) => {
        const sut = createRockPaperScissors();

        const actual = sut.play(...input);

        expect(actual).toBe(expected);
      });
    });
    describe("Player wins {Player} vs {Opponent}", () => {
      test.each([
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Paper,
          expected: Outcome.PlayerWins,
        },
        {
          playerMove: Move.Rock,
          opponentMove: Move.Scissors,
          expected: Outcome.PlayerWins,
        },
        {
          playerMove: Move.Paper,
          opponentMove: Move.Rock,
          expected: Outcome.PlayerWins,
        },
      ])(
        "Player wins $playerMove vs $opponentMove",
        ({ playerMove, opponentMove, expected }) => {
          const sut = createRockPaperScissors();

          const actual = sut.play(playerMove, opponentMove);

          expect(actual).toBe(expected);
        }
      );
    });
    describe("Player loses {Player} vs {Opponent}", () => {
      test.each([
        {
          playerMove: Move.Paper,
          opponentMove: Move.Scissors,
          expected: Outcome.PlayerLoses,
        },
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Rock,
          expected: Outcome.PlayerLoses,
        },
        {
          playerMove: Move.Rock,
          opponentMove: Move.Paper,
          expected: Outcome.PlayerLoses,
        },
      ])(
        "Player loses $playerMove vs $opponentMove",
        ({ playerMove, opponentMove, expected }) => {
          const sut = createRockPaperScissors();

          const actual = sut.play(playerMove, opponentMove);

          expect(actual).toBe(expected);
        }
      );
    });
  });
});
