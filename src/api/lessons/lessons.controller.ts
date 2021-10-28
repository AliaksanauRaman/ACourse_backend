import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { DB_LESSONS_SERVICE } from './tokens/db-lessons-service.token';
import { IDbLessonsService } from './interfaces/db-lessons-service.interface';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Lesson } from './types/lesson.type';
import { mapLessonDbRecordToLesson } from './utils/map-lesson-db-record-to-lesson.util';
import { UUIDValidatorPipe } from 'src/shared/pipes/uuid-validator.pipe';
import { ModifyLessonDto } from './dtos/modify-lesson.dto';

@Controller('api/lessons')
export class LessonsController {
  constructor(
    @Inject(DB_LESSONS_SERVICE)
    private readonly dbLessonsService: IDbLessonsService,
  ) {}

  @Get('/:lessonId')
  async handleGetLessonById(
    @Param('lessonId', UUIDValidatorPipe) lessonId: string,
  ): Promise<Lesson> {
    const lessonDbRecord = await this.dbLessonsService.selectLessonById(
      lessonId,
    );

    if (lessonDbRecord === null) {
      throw new NotFoundException('Lesson was not found!');
    }

    return mapLessonDbRecordToLesson(lessonDbRecord);
  }

  @Post('/')
  async handleCreateLesson(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    const insertedLessonDbRecord = await this.dbLessonsService.insertLesson(
      createLessonDto,
    );
    return mapLessonDbRecordToLesson(insertedLessonDbRecord);
  }

  @Put('/:lessonId')
  async handleModifyLesson(
    @Param('lessonId', UUIDValidatorPipe)
    lessonId: string,
    @Body() modifyLessonDto: ModifyLessonDto,
  ): Promise<Lesson> {
    const updatedLessonDbRecord = await this.dbLessonsService.updateLesson(
      lessonId,
      modifyLessonDto,
    );

    if (updatedLessonDbRecord === null) {
      throw new NotFoundException('Lesson was not found!');
    }

    return mapLessonDbRecordToLesson(updatedLessonDbRecord);
  }

  @Delete('/:lessonId')
  async handleDeleteLesson(
    @Param('lessonId', UUIDValidatorPipe)
    lessonId: string,
  ): Promise<Lesson> {
    const deletedLessonDbRecord = await this.dbLessonsService.deleteLesson(
      lessonId,
    );

    if (deletedLessonDbRecord === null) {
      throw new NotFoundException('Lesson was not found!');
    }

    return mapLessonDbRecordToLesson(deletedLessonDbRecord);
  }
}
