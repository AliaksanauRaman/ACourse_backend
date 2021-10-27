import {
  Body,
  Controller,
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

@Controller('lessons')
export class LessonsController {
  constructor(
    @Inject(DB_LESSONS_SERVICE)
    private readonly dbLessonsService: IDbLessonsService,
  ) {}

  @Post('/')
  async handleCreateLesson(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    const createdLessonDbRecord = await this.dbLessonsService.insertLesson(
      createLessonDto,
    );
    return mapLessonDbRecordToLesson(createdLessonDbRecord);
  }

  @Put('/:lessonId')
  async handleModifyLesson(
    @Param('lessonId', UUIDValidatorPipe)
    lessonId: string,
    @Body() modifyLessonDto: ModifyLessonDto,
  ): Promise<Lesson> {
    const modifiedLessonDbRecord = await this.dbLessonsService.updateLesson(
      lessonId,
      modifyLessonDto,
    );

    if (modifiedLessonDbRecord === null) {
      throw new NotFoundException('Lesson was not found!');
    }

    return mapLessonDbRecordToLesson(modifiedLessonDbRecord);
  }
}
