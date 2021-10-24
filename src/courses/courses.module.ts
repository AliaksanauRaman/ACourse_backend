import { Module } from '@nestjs/common';

import { FilesModule } from '../files/files.module';
import { StorageModule } from '../storage/storage.module';
import { DbModule } from '../db/db.module';

import { CoursesController } from './courses.controller';
import { CoursesDbService } from './courses-db.service';
import { LecturesDbService } from './lectures-db.service';
import { COURSES_DB_SERVICE } from './tokens/courses-db-service.token';

@Module({
  imports: [DbModule, FilesModule, StorageModule],
  controllers: [CoursesController],
  providers: [
    {
      provide: COURSES_DB_SERVICE,
      useClass: CoursesDbService,
    },
    LecturesDbService,
  ],
  exports: [],
})
export class CoursesModule {}
