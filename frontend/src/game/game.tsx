import {FunctionComponent} from "react";
import {useState} from "react";
import {useEffect} from "react";
import {GameCardComponent} from "./components/game-card/game-card.component";
import {Button} from "./components/button/button";
import {Jokenpo, Move} from "./dto";
import {Fetcher} from "../api";
import './game.css'

type GameType = {}
const A_SECOND = 600
let autoBetTimeout: NodeJS.Timeout
const fetcher = new Fetcher()

export const Game: FunctionComponent<GameType> = () => {
    const [moves, setMoves] = useState<Move[]>([])
    const [timer, setTimer] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(false)

    const toggleAutoPlay = () => {
        setIsAutoPlaying(!isAutoPlaying)
    }
    useEffect(() => {
        isAutoPlaying ?
            autoBet() :
            clearTimeout(autoBetTimeout)
    }, [isAutoPlaying])

    const makeBetIn = (times: number) => {
        if (times == 0) {
            setTimer(0)
            fetcher.postData("/api/bet", moves[0]).then((data: Move[]) => {
                setMoves(data.map((it: Move) => new Move({...it})))
            })
        }
        if (times !== 0) {
            setTimer(times)
            setTimeout(() => makeBetIn(times - 1), A_SECOND)
        }
    }

    const autoBet = () => {
        if (!isAutoPlaying) {
            return
        }
        setMoves([])

    }

    const makeMove = (move: Jokenpo) => {
        setIsAutoPlaying(false)
        const playerMove = new Move()
        playerMove.move = move
        playerMove.isConn = false
        setMoves([playerMove])
        makeBetIn(3)
    }

    const player1 = selectMove(moves, 0);
    const player2 = selectMove(moves, 1);

    return (
        <section id="game-container">
            <h1>{headlineText(moves)}</h1>
            <div id="game-container__display">
                <GameCardComponent label={player1.player} win={player1.win} selected={player1.move}/>
                <h3> {timer === 0 ? "VS" : timer} </h3>
                <GameCardComponent label={player2.player} win={player2.win} selected={player2.move}/>
            </div>
            <div id="game-container__gamepad">
                <div id="game-container__buttons">
                    <Button
                        data-testid={data_testIds.rock}
                        onClick={() => makeMove(Jokenpo.ROCK)}
                        icon={Jokenpo.ROCK}
                    />
                    <Button
                        data-testid={data_testIds.paper}
                        onClick={() => makeMove(Jokenpo.PAPER)}
                        icon={Jokenpo.PAPER}
                    />
                    <Button
                        data-testid={data_testIds.scissor}
                        onClick={() => makeMove(Jokenpo.SCISSOR)}
                        icon={Jokenpo.SCISSOR}
                    />
                </div>
                <Button
                    onClick={() => toggleAutoPlay()}
                    label={isAutoPlaying ? "Stop Auto play" : "Auto play"}
                />
            </div>
        </section>
    )
}

export function headlineText(moves: Move[]) {
    const waitingMessages = {
        "0": "Make your bet!",
        "1": "Betting in progress"
    }[moves.length]

    if (waitingMessages) {
        return waitingMessages
    }

    const winner = moves.filter(it => it.win)
    if (winner.length === 0) {
        return "Its a tie!"
    }

    if (!moves.find(it => it.isConn == false)) {
        return "House always win"
    }

    if (!winner[0].isConn) {
        return "You win!"
    } else {
        return "You lose!"
    }
}

function selectMove(moves: Move[], index: number): Move {
    if (!moves[index]) {
        return new Move()
    }
    return moves[index]
}

export const data_testIds = {
    rock: "game-container__buttons_rock",
    paper: "game-container__buttons_paper",
    scissor: "game-container__buttons_scissor"
}