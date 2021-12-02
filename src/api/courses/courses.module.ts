import { Module } from '@nestjs/common';

import { DbModule } from '../../db/db.module';

import { CoursesController } from './courses.controller';

import { DB_COURSES_SERVICE } from './tokens/db-courses-service.token';
import { PosrgreSQLBasedCoursesDbService } from './services/postgresql-based-courses-db.service';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: DB_COURSES_SERVICE,
      useClass: PosrgreSQLBasedCoursesDbService,
    },
  ],
  controllers: [CoursesController],
})
export class CoursesModule {}
