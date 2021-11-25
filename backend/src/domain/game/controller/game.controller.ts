import { Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Move } from '../dto';
import { GameService } from '../service/game.service';

@Controller('api/bet')
export class GameController {
  constructor(
    @Inject(GameService)
    private game: GameService,
  ) {}

  @HttpCode(200)
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async bet(@Body() move: Move): Promise<Move[]> {
    return this.game.playerGame(move);
  }

  @HttpCode(200)
  @Post('/auto')
  async auto(): Promise<Move[]> {
    return this.game.autoPlay();
  }
}
