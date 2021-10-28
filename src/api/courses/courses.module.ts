import { Module } from '@nestjs/common';

import { DbModule } from '../../db/db.module';

import { CoursesController } from './courses.controller';

import { DB_COURSES_SERVICE } from './tokens/db-courses-service.token';
import { DbCoursesService } from './services/db-courses.service';

@Module({
  imports: [DbModule],
  providers: [
    {
      provide: DB_COURSES_SERVICE,
      useClass: DbCoursesService,
    },
  ],
  controllers: [CoursesController],
})
export class CoursesModule {}
