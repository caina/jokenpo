import {Module} from '@nestjs/common';
import GameModule from "./domain/game/game.module";

@Module({
  imports: [GameModule],
})
export class AppModule {}
