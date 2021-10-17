import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { StorageModule } from '../storage/storage.module';

import { DbModule } from '../db/db.module';

import { CoursesController } from './courses.controller';
import { CoursesDbService } from './courses-db.service';
import { LecturesDbService } from './lectures.service';

@Module({
  imports: [DbModule, FilesModule, StorageModule],
  controllers: [CoursesController],
  providers: [CoursesDbService, LecturesDbService],
  exports: [],
})
export class CoursesModule {}
