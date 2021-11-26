import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { services } from './service';
import { ConsoleModule } from '@squareboat/nest-console';
import { GameConsole } from './console/game.console';

@Module({
  imports: [ConsoleModule],
  controllers: [GameController],
  providers: [...services, GameConsole],
})
export default class GameModule {}
