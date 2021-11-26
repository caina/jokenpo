import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Move } from '../src/domain/game/dto';
import { Jokenpo } from '../src/domain/game/dto';
import { GamebotService } from '../src/domain/game/service/gamebot.service';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  const gameBotService = {
    makeMove: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(GamebotService)
      .useValue(gameBotService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/bet (POST) works', async () => {
    gameBotService.makeMove.mockReturnValue(
      new Move({
        isConn: true,
        move: Jokenpo.ROCK,
      }),
    );

    const move = new Move({
      isConn: false,
      move: Jokenpo.PAPER,
    });

    const { body } = await request(app.getHttpServer())
      .post('/api/bet')
      .send(move)
      .expect(200);

    expect(body[0].isConn).toBeFalsy();
    expect(body[0].win).toBeTruthy();
    expect(body[1].isConn).toBeTruthy();
    expect(body[1].win).toBeFalsy();
  });

  it('should not be able to bet with invalid request', () => {
    request(app.getHttpServer()).post('/api/bet').expect(400);
  });

  it('should not be able to bet with invalid request with body', () => {
    request(app.getHttpServer())
      .post('/api/bet')
      .send(new Move({ isConn: true, move: 'NOENUM' as Jokenpo }))
      .expect(400);
  });

  it('should not be able to bet with invalid request with body isConn', () => {
    request(app.getHttpServer())
      .post('/api/bet')
      .send(new Move({ move: Jokenpo.ROCK }))
      .expect(400);
  });

  it('should play alone', async () => {
    gameBotService.makeMove.mockReturnValue(
      new Move({
        isConn: true,
        move: Jokenpo.ROCK,
      }),
    );

    await request(app.getHttpServer()).post('/api/bet/auto').expect(200);
  });
});
