import {FunctionComponent} from "react";
import {useState} from "react";
import {GameCardComponent} from "./components/game-card/game-card.component";
import {Button} from "./components/button/button";
import {Jokenpo, Move} from "./dto";
import {useEffect} from "react";
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
        playerMove.win = null
        playerMove.player = "Player"
        setMoves([playerMove])
        makeBetIn(3)
    }

    return (
        <section id="game-container">
            <h1>Make your bet!</h1>
            <div id="game-container__display">
                <GameCardComponent label={selectMove(moves, 0).player} win={selectMove(moves, 0).win}
                                   selected={selectMove(moves, 0).move}/>
                <h3> {timer === 0 ? "VS" : timer} </h3>
                <GameCardComponent label={selectMove(moves, 1).player} win={selectMove(moves, 1).win}
                                   selected={selectMove(moves, 1).move}/>
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

function selectMove(moves: Move[], index: number): Move {
    const defaultMove = () => {
        const playerMove = new Move()
        playerMove.move = undefined
        playerMove.win = null
        playerMove.player = "Choose your move"
        return playerMove
    }
    if (!moves[index]) {
        return defaultMove()
    }
    return moves[index]
}

export const data_testIds = {
    rock: "game-container__buttons_rock",
    paper: "game-container__buttons_paper",
    scissor: "game-container__buttons_scissor"
}