import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { COURSES_DB_SERVICE } from './tokens/courses-db-service.token';
import { ICoursesDbService } from './interfaces/courses-db-service.interface';
import { Endpoint } from '../../constants/endpoints';
import { Course } from './types/course.type';
import { mapCourseDbRecordToCourse } from './utils/map-course-db-record-to-course.util';
import { UUIDValidatorPipe } from '../../shared/pipes/uuid-validator.pipe';
import { User } from '../../shared/decorators/user.decorator';
import { Lesson } from '../lessons/types/lesson.type';
import { mapLessonDbRecordToLesson } from '../lessons/utils/map-lesson-db-record-to-lesson.util';
import { CreateCourseDto } from './dtos/create-course.dto';
import { ModifyCourseDto } from './dtos/modify-course.dto';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { COURSE_NOT_FOUND_MESSAGE } from './errors/messages';
import { COURSE_NOT_FOUND_EXCEPTION } from './errors/exceptions';
import { JwtAuthenticationGuard } from '../authentication/guards/jwt-authentication.guard';
import { UserWithoutPassword } from '../users/types/user-without-password.type';

@UseGuards(JwtAuthenticationGuard)
@ApiTags(Endpoint.COURSES)
@Controller(`api/${Endpoint.COURSES}`)
export class CoursesController {
  constructor(
    @Inject(COURSES_DB_SERVICE)
    private readonly coursesDbService: ICoursesDbService,
  ) {}

  @ApiOkResponse({ type: [Course] })
  @Get('/')
  async handleGetUserCourses(
    @User() user: UserWithoutPassword,
  ): Promise<Array<Course>> {
    const coursesDbRecords = await this.coursesDbService.selectUserCourses(
      user.id,
    );
    return coursesDbRecords.map(mapCourseDbRecordToCourse);
  }

  @ApiOkResponse({ type: Course })
  @ApiNotFoundResponse({ description: COURSE_NOT_FOUND_MESSAGE })
  @Get('/:courseId')
  async handleGetCourseById(
    @Param('courseId', UUIDValidatorPipe) courseId: string,
  ): Promise<Course> {
    const courseDbRecord = await this.coursesDbService.selectCourseById(
      courseId,
    );

    if (courseDbRecord === null) {
      throw COURSE_NOT_FOUND_EXCEPTION;
    }

    return mapCourseDbRecordToCourse(courseDbRecord);
  }

  @ApiOkResponse({ type: [Lesson] })
  @ApiNotFoundResponse({ description: COURSE_NOT_FOUND_MESSAGE })
  @Get('/:courseId/lessons')
  async handleGetCourseLessons(
    @Param('courseId', UUIDValidatorPipe) courseId: string,
  ): Promise<Array<Lesson>> {
    const courseExists = await this.coursesDbService.checkIfCourseExists(
      courseId,
    );

    if (!courseExists) {
      throw COURSE_NOT_FOUND_EXCEPTION;
    }

    const courseLessonsDbRecords =
      await this.coursesDbService.selectAllCourseLessons(courseId);
    return courseLessonsDbRecords.map(mapLessonDbRecordToLesson);
  }

  @ApiCreatedResponse({ type: Course })
  @Post('/')
  async handleCreateCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const insertedCourseDbRecord = await this.coursesDbService.insertCourse(
      createCourseDto,
    );
    return mapCourseDbRecordToCourse(insertedCourseDbRecord);
  }

  @ApiOkResponse({ type: Course })
  @ApiNotFoundResponse({ description: COURSE_NOT_FOUND_MESSAGE })
  @Put('/:courseId')
  async handleModifyCourse(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
    @Body() modifyCourseDto: ModifyCourseDto,
  ): Promise<Course> {
    const updatedCourseDbRecord = await this.coursesDbService.updateCourse(
      courseId,
      modifyCourseDto,
    );

    if (updatedCourseDbRecord === null) {
      throw COURSE_NOT_FOUND_EXCEPTION;
    }

    return mapCourseDbRecordToCourse(updatedCourseDbRecord);
  }

  @ApiOkResponse({ type: Course })
  @ApiNotFoundResponse({ description: COURSE_NOT_FOUND_MESSAGE })
  @Delete('/:courseId')
  async handleDeleteCourse(
    @Param('courseId', UUIDValidatorPipe)
    courseId: string,
  ): Promise<Course> {
    const deletedCourseDbRecord = await this.coursesDbService.deleteCourse(
      courseId,
    );

    if (deletedCourseDbRecord === null) {
      throw COURSE_NOT_FOUND_EXCEPTION;
    }

    return mapCourseDbRecordToCourse(deletedCourseDbRecord);
  }
}
