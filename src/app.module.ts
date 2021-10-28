import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule as OldCoursesModule } from './courses/courses.module';
import { CoursesModule } from './api/courses/courses.module';
import { LessonsModule } from './api/lessons/lessons.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    OldCoursesModule,
    CoursesModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
