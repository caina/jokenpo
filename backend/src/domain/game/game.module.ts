import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { services } from './service';
import { GameFacade } from './service/game.facade';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [...services],
})
export default class GameModule {}
