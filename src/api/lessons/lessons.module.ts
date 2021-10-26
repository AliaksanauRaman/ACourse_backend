import { Module } from '@nestjs/common';

import { DbModule } from 'src/db/db.module';

import { LessonsController } from './lessons.controller';

import { DB_LESSONS_SERVICE } from './tokens/db-lessons-service.token';
import { DbLessonsService } from './services/db-lessons.service';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: DB_LESSONS_SERVICE,
      useClass: DbLessonsService,
    },
  ],
  controllers: [LessonsController],
})
export class LessonsModule {}
