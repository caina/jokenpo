import {Controller} from "@nestjs/common";
import {Post} from "@nestjs/common";
import {Move} from "../dto";
import {Jokenpo} from "../dto";

@Controller("api/bet")
export class GameController {

    @Post()
    async bet(): Promise<Move[]> {

        return [
            new Move({
                isConn: false,
                win: false,
                move: Jokenpo.PAPER
            }),
            new Move({
                isConn: true,
                win: false,
                move: Jokenpo.PAPER
            })
        ]
    }

    @Post("/auto")
    async auto(): Promise<Move[]> {
        return []
    }
}