interface RockPaperScissors {
  play(playerMove: Move, opponentMove: Move): Outcome;
}

export enum Move {
  Paper = "PAPER",
  Scissors = "SCISSORS",
  Rock = "ROCK",
}

export enum Outcome {
  PlayerWins,
  PlayerLoses,
  Tie,
}

export function createRockPaperScissors(): RockPaperScissors {
  return {
    play(playerMove: Move, opponentMove: Move): Outcome {
      const scenarios = Array(
        {
          playerMove: Move.Paper,
          opponentMove: Move.Scissors,
          outcome: Outcome.PlayerLoses,
        },
        {
          playerMove: Move.Paper,
          opponentMove: Move.Rock,
          outcome: Outcome.PlayerWins,
        },
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Rock,
          outcome: Outcome.PlayerLoses,
        },
        {
          playerMove: Move.Scissors,
          opponentMove: Move.Paper,
          outcome: Outcome.PlayerWins,
        },
        {
          playerMove: Move.Rock,
          opponentMove: Move.Paper,
          outcome: Outcome.PlayerLoses,
        },
        {
          playerMove: Move.Rock,
          opponentMove: Move.Scissors,
          outcome: Outcome.PlayerWins,
        }
      );
      const result = scenarios.find(
        (scenario) =>
          scenario.playerMove === playerMove &&
          scenario.opponentMove === opponentMove
      );
      if (result) return result.outcome;

      return Outcome.Tie;
    },
  };
}
