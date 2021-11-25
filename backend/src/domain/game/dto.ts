import { IsEnum } from 'class-validator';
import { IsBoolean } from 'class-validator';

export enum Jokenpo {
  PAPER = 'PAPER',
  ROCK = 'ROCK',
  SCISSOR = 'SCISSOR',
}

export class Move {
  @IsBoolean()
  isConn: boolean | undefined = undefined;
  @IsEnum(Jokenpo)
  move?: Jokenpo = undefined;
  win: boolean | null = null;

  constructor(raw?: Partial<Move>) {
    raw && Object.assign(this, raw);
  }
}
