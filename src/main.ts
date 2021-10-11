import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { CORS_OPTIONS } from './core/cors-options';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS_OPTIONS);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT || 3333);
}

bootstrap();
