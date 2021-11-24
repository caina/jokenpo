export enum Jokenpo {
    PAPER = "PAPER",
    ROCK = "ROCK",
    SCISSOR = "SCISSOR",
}

export class Move {
    isConn: boolean | undefined = undefined;
    move?: Jokenpo = undefined;
    win: boolean | null = null;

    constructor(raw?: Partial<Move>) {
        raw && Object.assign(this, raw);
    }
}