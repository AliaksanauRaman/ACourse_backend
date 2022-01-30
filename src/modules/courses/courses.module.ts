import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';

import { CoursesController } from './courses.controller';

import { COURSES_DB_SERVICE } from './interfaces/courses-db-service.interface';
import { COURSES_SERVICE } from './interfaces/courses-service.interface';
import { CoursesService } from './services/courses.service';
import { PosrgreSQLBasedCoursesDbService } from './services/postgresql-based-courses-db.service';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: COURSES_DB_SERVICE,
      useClass: PosrgreSQLBasedCoursesDbService,
    },
    {
      provide: COURSES_SERVICE,
      useClass: CoursesService,
    },
  ],
  controllers: [CoursesController],
})
export class CoursesModule {}
