import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { setupCors } from './core/setup-cors';
import { setupSwagger } from './core/setup-swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupCors(app);
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  await app.listen(process.env.PORT || 3333);
}

bootstrap();
