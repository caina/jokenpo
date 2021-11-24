import {Module} from "@nestjs/common";
import {GameController} from "./controller/game.controller";

@Module({
    imports: [],
    controllers: [GameController],
    providers: [],
})
export default class GameModule{}