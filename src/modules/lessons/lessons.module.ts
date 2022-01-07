import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';

import { LessonsController } from './lessons.controller';

import { LESSONS_DB_SERVICE } from './tokens/lessons-db-service.token';
import { PostgreSQLBasedLessonsDbService } from './services/postgresql-based-lessons-db.service';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: LESSONS_DB_SERVICE,
      useClass: PostgreSQLBasedLessonsDbService,
    },
  ],
  controllers: [LessonsController],
})
export class LessonsModule {}
