export enum Jokenpo {
    PAPER = "paper.svg",
    ROCK = "rock.svg",
    SCISSOR = "scissors.svg",
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
    }
}
