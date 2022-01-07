import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthenticationModule } from './authentication/authentication.module';
import { CoursesModule } from './api/courses/courses.module';
import { LessonsModule } from './api/lessons/lessons.module';
import { UsersModule } from './modules/users/users.module';

import { AppController } from './app.controller';
import { AppService } from './app.service';

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
