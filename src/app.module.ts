import { Module } from '@nestjs/common';

import { CoursesModule } from './courses/courses.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
