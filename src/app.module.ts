import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule } from './api/courses/courses.module';
import { LessonsModule } from './api/lessons/lessons.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({}), CoursesModule, LessonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
