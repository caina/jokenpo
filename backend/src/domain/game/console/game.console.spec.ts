import { GameConsole } from './game.console';
import { CommandArguments } from '@squareboat/nest-console';
import { ConsoleModule } from '@squareboat/nest-console';
import { _cli } from '@squareboat/nest-console';
import { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { GameService } from '../service/game.service';
import { Move } from '../dto';
import { Jokenpo } from '../dto';

jest.mock('@squareboat/nest-console', () => ({
  // @ts-ignore
  ...jest.requireActual('@squareboat/nest-console'),
  _cli: {
    error: jest.fn(),
    success: jest.fn(),
    info: jest.fn(),
  },
}));

describe('game.console.ts', function () {
  let service;
  const gameService = {
    playerGame: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConsoleModule],
      providers: [GameConsole, { provide: GameService, useValue: gameService }],
    }).compile();
    service = module.get(GameConsole);
    jest.clearAllMocks();
  });

  it('should not accept if argument does not contain a valid move', function () {
    service.bet({ move: 'INVALID' } as CommandArguments);

    expect(_cli.error).toHaveBeenCalledWith(GameConsole.messages.wrong_input);
  });

  it('should make bet', async () => {
    gameService.playerGame.mockResolvedValue([
      new Move({
        move: Jokenpo.ROCK,
        isConn: false,
        win: true,
      }),
      new Move({
        move: Jokenpo.SCISSOR,
        isConn: true,
        win: false,
      }),
    ]);

    await service.bet({ move: 'ROCK' } as CommandArguments);

    expect(_cli.error).not.toHaveBeenCalled();
    expect(gameService.playerGame).toHaveBeenCalledWith(
      new Move({ isConn: false, move: Jokenpo.ROCK }),
    );
    expect(_cli.success).toHaveBeenCalledWith(GameConsole.messages.win);
  });

  it('should lose the game', async () => {
    gameService.playerGame.mockResolvedValue([
      new Move({
        move: Jokenpo.SCISSOR,
        isConn: false,
        win: false,
      }),
      new Move({
        move: Jokenpo.ROCK,
        isConn: true,
        win: true,
      }),
    ]);

    await service.bet({ move: 'SCISSOR' } as CommandArguments);

    expect(_cli.success).not.toHaveBeenCalled();
    expect(_cli.error).toHaveBeenCalledWith(GameConsole.messages.lose);
  });

  it('should be a tie', async () => {
    gameService.playerGame.mockResolvedValue([
      new Move({
        move: Jokenpo.ROCK,
        isConn: false,
        win: false,
      }),
      new Move({
        move: Jokenpo.ROCK,
        isConn: true,
        win: false,
      }),
    ]);

    await service.bet({ move: 'ROCK' } as CommandArguments);

    expect(_cli.success).not.toHaveBeenCalled();
    expect(_cli.error).not.toHaveBeenCalled();
    expect(_cli.info).toHaveBeenCalledWith(GameConsole.messages.tie);
  });
});
