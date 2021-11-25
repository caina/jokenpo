import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { GamebotService } from './gamebot.service';
import { Move } from '../dto';
import { Jokenpo } from '../dto';

@Injectable()
export class GameFacade {
  constructor(
    @Inject(GamebotService)
    private gameBot: GamebotService,
  ) {}

  rules = {
    [Jokenpo.ROCK]: [Jokenpo.SCISSOR],
    [Jokenpo.PAPER]: [Jokenpo.ROCK],
    [Jokenpo.SCISSOR]: [Jokenpo.PAPER],
  };

  async playerGame(playerMove: Move) {
    const botMove = this.gameBot.makeMove();

    playerMove.win = this.applyRules(playerMove.move, botMove.move);
    botMove.win = this.applyRules(botMove.move, playerMove.move);

    return [playerMove, botMove];
  }

  private applyRules(challenger: Jokenpo, challenged: Jokenpo) {
    return this.rules[challenger].includes(challenged);
  }
}
