import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CoursesModule } from './api/courses/courses.module';
import { LessonsModule } from './api/lessons/lessons.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';

import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    AuthenticationModule,
    CoursesModule,
    LessonsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
