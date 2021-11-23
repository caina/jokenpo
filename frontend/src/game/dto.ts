export enum Jokenpo {
    PAPER = "paper.svg",
    ROCK = "rock.svg",
    SCISSOR = "scissors.svg",
}

export class Move {
    player: string = ""
    move?: Jokenpo = undefined
    win: boolean | null = null
}
