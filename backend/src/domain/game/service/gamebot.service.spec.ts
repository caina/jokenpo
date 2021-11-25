import { GamebotService } from './gamebot.service';

describe('gamebot.service.ts', function () {
  it('should make a random move', function () {
    const service = new GamebotService();
    const move = service.makeMove();

    expect(move.isConn).toBeTruthy();
    expect(move.move).toBeDefined();
  });
});
