import { Injectable } from '@nestjs/common';
import { Command } from '@squareboat/nest-console';
import { CommandArguments, _cli } from '@squareboat/nest-console';
import { Jokenpo } from '../dto';
import { GameService } from '../service/game.service';
import { Inject } from '@nestjs/common';
import { Move } from '../dto';

@Injectable()
export class GameConsole {
  static messages = {
    wrong_input: "Bet should be 'ROCK', 'PAPER' OR SCISSOR",
    win: 'You win!',
    lose: 'You lose',
    tie: 'Its a tie!',
  };

  constructor(
    @Inject(GameService)
    private game: GameService,
  ) {}

  @Command('bet', {
    desc: 'Bet on Rock, Scissor or Paper against machine',
    args: { move: { req: true } },
  })
  async bet(args: CommandArguments) {
    const move = (<any>Jokenpo)[args.move as string];
    if (move === undefined) {
      _cli.error(GameConsole.messages.wrong_input);
      return;
    }

    const results = await this.game.playerGame(
      new Move({
        isConn: false,
        move,
      }),
    );

    if (results.filter((it) => it.win).length === 0) {
      _cli.info(GameConsole.messages.tie);
      return;
    }

    if (results.find((it) => it.isConn == false && it.win)) {
      _cli.success(GameConsole.messages.win);
      return;
    }

    _cli.error(GameConsole.messages.lose);
    return;
  }

  @Command('auto', {
    desc: 'auto bet',
  })
  async auto() {
    const result = await this.game.autoPlay();

    if (result.filter((it) => it.win).length === 0) {
      _cli.info(GameConsole.messages.tie);
      return;
    }

    result.forEach((bot, index) => {
      if (bot.win) {
        _cli.success(`bot0${index + 1} win with ${bot.move}`);
      } else {
        _cli.error(`bot0${index + 1} lose with ${bot.move}`);
      }
    });
  }
}
