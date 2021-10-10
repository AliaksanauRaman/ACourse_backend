import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // TODO: Config cors

  await app.listen(process.env.PORT || 3333);
}

bootstrap();
