import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';

import { CoursesService } from './courses.service';
import { LecturesService } from './lectures.service';

import { Course } from './types/course';
import { CreateCourseDto } from './dtos/create-course.dto';
import { mapLectureDbRecordToLecture } from './utils/map-lecture-db-record-to-lecture';
import { Lecture } from './types/lecture';
import { mapCourseDbRecordToCourse } from './utils/map-course-db-record-to-course';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { UUID_VERSION } from '../constants';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly lecturesService: LecturesService,
  ) {}

  @Get('/')
  async handleGetAllCourses(): Promise<Array<Course>> {
    const coursesFromDb = await this.coursesService.getAllCoursesFromDb();
    return coursesFromDb.map(mapCourseDbRecordToCourse);
  }

  // TODO: Check if needed
  @Get('/:courseId')
  async handleGetCourseById(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
  ): Promise<Course> {
    const courseFromDb = await this.coursesService.getCourseByIdFromDb(
      courseId,
    );
    return mapCourseDbRecordToCourse(courseFromDb);
  }

  @Get('/:courseId/lectures')
  async handleGetAllCourseLectures(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
  ): Promise<Array<Lecture>> {
    const lecturesFromDb =
      await this.lecturesService.getAllCourseLecturesFromDb(courseId);
    return lecturesFromDb.map(mapLectureDbRecordToLecture);
  }

  @Post('/')
  async handleCreateCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const courseAddedToDb = await this.coursesService.addCourseToDb(
      createCourseDto,
    );
    return mapCourseDbRecordToCourse(courseAddedToDb);
  }

  @Post('/:courseId/lectures')
  async handleCreateCourseLecture(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
    @Body() createLectureDto: CreateLectureDto,
  ): Promise<Lecture> {
    const lectureAddedToDb = await this.lecturesService.addLectureToDb(
      courseId,
      createLectureDto,
    );
    return mapLectureDbRecordToLecture(lectureAddedToDb);
  }

  @Delete('/:courseId')
  async handleDeleteCourse(
    @Param('courseId', new ParseUUIDPipe({ version: UUID_VERSION }))
    courseId: string,
  ): Promise<Course> {
    const deletedCourseFromDb = await this.coursesService.deleteCourseFromDb(
      courseId,
    );
    return mapCourseDbRecordToCourse(deletedCourseFromDb);
  }
}
