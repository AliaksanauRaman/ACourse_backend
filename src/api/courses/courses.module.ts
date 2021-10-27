import { Module } from '@nestjs/common';

import { CoursesController } from './courses.controller';

import { DB_COURSES_SERVICE } from './tokens/db-courses-service.token';
import { DbCoursesService } from './services/db-courses.service';

@Module({
  imports: [],
  controllers: [CoursesController],
  providers: [
    {
      provide: DB_COURSES_SERVICE,
      useClass: DbCoursesService,
    },
  ],
})
export class CoursesModule {}
