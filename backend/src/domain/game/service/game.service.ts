import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { GamebotService } from './gamebot.service';
import { Move } from '../dto';
import { Jokenpo } from '../dto';
import { Logger } from '@nestjs/common';

@Injectable()
export class GameService {
  private readonly logger = new Logger(GamebotService.name);

  constructor(
    @Inject(GamebotService)
    private gameBot: GamebotService,
  ) {}

  rules = {
    [Jokenpo.ROCK]: [Jokenpo.SCISSOR],
    [Jokenpo.PAPER]: [Jokenpo.ROCK],
    [Jokenpo.SCISSOR]: [Jokenpo.PAPER],
  };

  async playerGame(playerMove: Move): Promise<Move[]> {
    const botMove = this.gameBot.makeMove();

    playerMove.win = this.applyRules(playerMove.move, botMove.move);
    botMove.win = this.applyRules(botMove.move, playerMove.move);

    return [playerMove, botMove];
  }

  async autoPlay(): Promise<Move[]> {
    const botMove = this.gameBot.makeMove();
    const botMove2 = this.gameBot.makeMove();

    botMove.win = this.applyRules(botMove.move, botMove2.move);
    botMove2.win = this.applyRules(botMove2.move, botMove.move);

    return [botMove, botMove2];
  }

  private applyRules(challenger: Jokenpo, challenged: Jokenpo) {
    this.logger.log(`1:${challenger}`, `2:${challenged}`);

    return this.rules[challenger].includes(challenged);
  }
}
