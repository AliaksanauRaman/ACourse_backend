import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { Endpoint } from '../api/endpoints';

const SWAGGER_URL = '/swagger';
const SWAGGER_TITLE = 'ACourse API';
const SWAGGER_VERSION = '1.0';

export const setupSwagger = (app: INestApplication): void =>
  SwaggerModule.setup(
    SWAGGER_URL,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(SWAGGER_TITLE)
        .setVersion(SWAGGER_VERSION)
        .addTag(Endpoint.COURSES)
        .addTag(Endpoint.LESSONS)
        .build(),
    ),
  );
