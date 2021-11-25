import {Injectable} from "@nestjs/common";
import {Move} from "../dto";
import {Jokenpo} from "../dto";

@Injectable()
export class GamebotService {

    makeMove(): Move {

        return new Move({
            isConn: true,
            move: Jokenpo.ROCK
        })
    }
}