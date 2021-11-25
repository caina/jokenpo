import { Module } from '@nestjs/common';
import { GameController } from './controller/game.controller';
import { services } from './service';

@Module({
  imports: [],
  controllers: [GameController],
  providers: [...services],
})
export default class GameModule {}
