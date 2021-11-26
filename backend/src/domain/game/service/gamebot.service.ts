import { Injectable } from '@nestjs/common';
import { Move } from '../dto';
import { Jokenpo } from '../dto';

@Injectable()
export class GamebotService {
  makeMove(): Move {
    const move = this.randomMove();
    return new Move({
      isConn: true,
      move,
    });
  }

  randomMove(): Jokenpo {
    const random = Math.floor(Math.random() * Object.keys(Jokenpo).length);
    const selected = Object.values(Jokenpo)[random];
    return Jokenpo[selected];
  }
}
