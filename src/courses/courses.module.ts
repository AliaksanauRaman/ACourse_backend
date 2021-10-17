import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { StorageModule } from '../storage/storage.module';

import { DbModule } from '../db/db.module';

import { CoursesController } from './courses.controller';
import { CoursesDbService } from './courses-db.service';
import { LecturesService } from './lectures.service';

@Module({
  imports: [DbModule, FilesModule, StorageModule],
  controllers: [CoursesController],
  providers: [CoursesDbService, LecturesService],
  exports: [],
})
export class CoursesModule {}
