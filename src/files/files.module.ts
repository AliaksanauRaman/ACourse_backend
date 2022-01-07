import { Module } from '@nestjs/common';

import { DbModule } from '../modules/db/db.module';

import { FilesDbService } from './files-db.service';

@Module({
  imports: [DbModule],
  exports: [FilesDbService],
  providers: [FilesDbService],
  controllers: [],
})
export class FilesModule {}
