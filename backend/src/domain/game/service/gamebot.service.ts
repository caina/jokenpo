import { Injectable } from '@nestjs/common';
import { Move } from '../dto';
import { Jokenpo } from '../dto';

@Injectable()
export class GamebotService {
  makeMove(): Move {
    const move = randomMove();
    return new Move({
      isConn: true,
      move,
    });

    function randomMove(): Jokenpo {
      const length = Object.keys(Jokenpo).length;
      const option = +(Math.random() * length - 1).toFixed();
      const move = Object.keys(Jokenpo)[option];

      return move as Jokenpo;
    }
  }
}
