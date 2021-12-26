import { INestApplication } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const CORS_OPTIONS: CorsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:4200'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
};

export const setupCors = (app: INestApplication): void =>
  app.enableCors(CORS_OPTIONS);
