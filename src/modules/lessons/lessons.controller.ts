import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { LESSONS_DB_SERVICE } from './tokens/lessons-db-service.token';
import { ILessonsDbService } from './interfaces/lessons-db-service.interface';
import { CreateLessonDto } from './dtos/create-lesson.dto';
import { Endpoint } from '../../constants/endpoints';
import { Lesson } from './types/lesson.type';
import { mapLessonDbRecordToLesson } from './utils/map-lesson-db-record-to-lesson.util';
import { UUIDValidatorPipe } from 'src/shared/pipes/uuid-validator.pipe';
import { ModifyLessonDto } from './dtos/modify-lesson.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LESSON_NOT_FOUND_MESSAGE } from './errors/messages';
import { LESSON_NOT_FOUND_EXCEPTION } from './errors/exceptions';

@ApiTags(Endpoint.LESSONS)
@Controller(`api/${Endpoint.LESSONS}`)
export class LessonsController {
  constructor(
    @Inject(LESSONS_DB_SERVICE)
    private readonly lessonsDbService: ILessonsDbService,
  ) {}

  @ApiOkResponse({ type: Lesson })
  @ApiNotFoundResponse({ description: LESSON_NOT_FOUND_MESSAGE })
  @Get('/:lessonId')
  async handleGetLessonById(
    @Param('lessonId', UUIDValidatorPipe) lessonId: string,
  ): Promise<Lesson> {
    const lessonDbRecord = await this.lessonsDbService.selectLessonById(
      lessonId,
    );

    if (lessonDbRecord === null) {
      throw LESSON_NOT_FOUND_EXCEPTION;
    }

    return mapLessonDbRecordToLesson(lessonDbRecord);
  }

  @ApiCreatedResponse({ type: Lesson })
  @Post('/')
  async handleCreateLesson(
    @Body() createLessonDto: CreateLessonDto,
  ): Promise<Lesson> {
    const insertedLessonDbRecord = await this.lessonsDbService.insertLesson(
      createLessonDto,
    );
    return mapLessonDbRecordToLesson(insertedLessonDbRecord);
  }

  @ApiOkResponse({ type: Lesson })
  @ApiNotFoundResponse({ description: LESSON_NOT_FOUND_MESSAGE })
  @Put('/:lessonId')
  async handleModifyLesson(
    @Param('lessonId', UUIDValidatorPipe)
    lessonId: string,
    @Body() modifyLessonDto: ModifyLessonDto,
  ): Promise<Lesson> {
    const updatedLessonDbRecord = await this.lessonsDbService.updateLesson(
      lessonId,
      modifyLessonDto,
    );

    if (updatedLessonDbRecord === null) {
      throw LESSON_NOT_FOUND_EXCEPTION;
    }

    return mapLessonDbRecordToLesson(updatedLessonDbRecord);
  }

  @ApiOkResponse({ type: Lesson })
  @ApiNotFoundResponse({ description: LESSON_NOT_FOUND_MESSAGE })
  @Delete('/:lessonId')
  async handleDeleteLesson(
    @Param('lessonId', UUIDValidatorPipe)
    lessonId: string,
  ): Promise<Lesson> {
    const deletedLessonDbRecord = await this.lessonsDbService.deleteLesson(
      lessonId,
    );

    if (deletedLessonDbRecord === null) {
      throw LESSON_NOT_FOUND_EXCEPTION;
    }

    return mapLessonDbRecordToLesson(deletedLessonDbRecord);
  }
}
