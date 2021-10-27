import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';

import { DB_COURSES_SERVICE } from './tokens/db-courses-service.token';
import { DbCoursesService } from './services/db-courses.service';

import { Course } from './types/course.type';
import { mapCourseDbRecordToCourse } from './utils/map-course-db-record-to-course.util';
import { UUIDValidatorPipe } from 'src/shared/pipes/uuid-validator.pipe';
import { Lesson } from '../lessons/types/lesson.type';
import { mapLessonDbRecordToLesson } from '../lessons/utils/map-lesson-db-record-to-lesson.util';

@Controller('courses')
export class CoursesController {
  constructor(
    @Inject(DB_COURSES_SERVICE)
    private readonly dbCoursesService: DbCoursesService,
  ) {}

  @Get('/')
  async handleGetAllCourses(): Promise<Array<Course>> {
    const coursesDbRecords = await this.dbCoursesService.selectAllCourses();
    return coursesDbRecords.map(mapCourseDbRecordToCourse);
  }

  @Get('/:courseId')
  async handleGetCourseById(
    @Param('courseId', UUIDValidatorPipe) courseId: string,
  ): Promise<Course | null> {
    const courseDbRecord = await this.dbCoursesService.selectCourseById(
      courseId,
    );

    if (courseDbRecord === null) {
      throw new NotFoundException('Course was not found!');
    }

    return mapCourseDbRecordToCourse(courseDbRecord);
  }

  @Get('/:courseId/lessons')
  async handleGetCourseLessons(
    @Param('courseId', UUIDValidatorPipe) courseId: string,
  ): Promise<Array<Lesson>> {
    const courseExists = await this.dbCoursesService.checkIfCourseExists(
      courseId,
    );

    if (!courseExists) {
      throw new NotFoundException('Course was not found!');
    }

    const courseLessonsDbRecords =
      await this.dbCoursesService.selectAllCourseLessons(courseId);
    return courseLessonsDbRecords.map(mapLessonDbRecordToLesson);
  }
}
