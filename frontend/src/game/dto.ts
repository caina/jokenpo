export enum Jokenpo {
  PAPER = "PAPER",
  ROCK = "ROCK",
  SCISSOR = "SCISSOR",
}

export class Move {
  isConn: boolean | undefined = undefined;
  move?: Jokenpo = undefined;
  win: boolean | null = null;

  get player() {
    if (this.isConn === undefined) {
      return "Choose your move";
    }
    return this.isConn ? "Robot" : "Player";
  }

  constructor(raw?: Partial<Move>) {
    raw && Object.assign(this, raw);

    if (raw?.move) {
      this.move = (<any>Jokenpo)[raw.move];
    }
  }
}
export const getJokenpoImage = (selected: Jokenpo | undefined) =>
  ({
    [Jokenpo.PAPER]: "paper.svg",
    [Jokenpo.ROCK]: "rock.svg",
    [Jokenpo.SCISSOR]: "scissors.svg",
    none: "question.svg",
  }[selected || "none"]);
