import { GameFacade } from './game.facade';
import { GamebotService } from './gamebot.service';
import { Move } from '../dto';
import { Jokenpo } from '../dto';

describe('game.facade.service', function () {
  describe('Checking rules', function () {
    it('Paper wins against Rock', async () => {
      await checkRule(
        new Move({ move: Jokenpo.PAPER, win: true }),
        new Move({ move: Jokenpo.ROCK, win: false }),
      );
    });

    it('Paper lose against scissor', async () => {
      await checkRule(
        new Move({ move: Jokenpo.PAPER, win: false }),
        new Move({ move: Jokenpo.SCISSOR, win: true }),
      );
    });

    it('Paper ties against Paper', async () => {
      await checkRule(
        new Move({ move: Jokenpo.PAPER, win: false }),
        new Move({ move: Jokenpo.PAPER, win: false }),
      );
    });

    it('Rock wins against Scissor', async () => {
      await checkRule(
        new Move({ move: Jokenpo.ROCK, win: true }),
        new Move({ move: Jokenpo.SCISSOR, win: false }),
      );
    });

    it('Rock ties against Rock', async () => {
      await checkRule(
        new Move({ move: Jokenpo.ROCK, win: false }),
        new Move({ move: Jokenpo.ROCK, win: false }),
      );
    });

    async function checkRule(botMove: Move, playerMove: Move) {
      const { facade, gameBotService } = setUp();
      gameBotService.makeMove.mockReturnValue(
        new Move({ isConn: true, move: botMove.move }),
      );

      const result = await facade.playerGame(
        new Move({ isConn: false, move: playerMove.move }),
      );

      expect(result).toEqual([
        new Move({ isConn: false, move: playerMove.move, win: playerMove.win }),
        new Move({ isConn: true, move: botMove.move, win: botMove.win }),
      ]);
    }
  });

  function setUp() {
    const gameBotService = {
      makeMove: jest.fn(),
    };

    const facade = new GameFacade(gameBotService as GamebotService);

    return {
      facade,
      gameBotService,
    };
  }
});
