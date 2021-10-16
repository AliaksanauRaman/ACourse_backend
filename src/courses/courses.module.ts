import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { StorageModule } from '../storage/storage.module';

import { DbModule } from '../db/db.module';

import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { LecturesService } from './lectures.service';

@Module({
  imports: [DbModule, FilesModule, StorageModule],
  controllers: [CoursesController],
  providers: [CoursesService, LecturesService],
  exports: [],
})
export class CoursesModule {}
