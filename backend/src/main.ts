import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  console.log('Application started at:', 3001);
  await app.listen(3001);
}
bootstrap().catch(console.error);
