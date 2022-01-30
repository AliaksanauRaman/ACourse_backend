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
import {
  ICoursesDbService,
  COURSES_DB_SERVICE,
} from './interfaces/courses-db-service.interface';
import { Endpoint } from '../../constants/endpoint';
import { Course } from './types/course.type';
import { mapCourseDbRecordToCourse } from './utils/map-course-db-record-to-course.util';
import { UUIDValidatorPipe } from '../../shared/pipes/uuid-validator.pipe';
import { User } from '../../shared/decorators/user.decorator';
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

@ApiTags(Endpoint.COURSES)
@Controller(`api/${Endpoint.COURSES}`)
export class CoursesController {
  constructor(
    @Inject(COURSES_DB_SERVICE)
    private readonly coursesDbService: ICoursesDbService,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
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

  @UseGuards(JwtAuthenticationGuard)
  @ApiOkResponse({ type: Course })
  @ApiNotFoundResponse({ description: COURSE_NOT_FOUND_MESSAGE })
  @Get('/:courseId/with-lessons-previews')
  async handleGetCourseWithLessonsPreviews(
    @Param('courseId', UUIDValidatorPipe) courseId: string,
  ): Promise<Course> {
    const courseDbRecord = await this.coursesDbService.getCourseById(courseId);

    if (courseDbRecord === null) {
      throw COURSE_NOT_FOUND_EXCEPTION;
    }

    return mapCourseDbRecordToCourse(courseDbRecord);
  }

  @UseGuards(JwtAuthenticationGuard)
  @ApiCreatedResponse({ type: Course })
  @Post('/')
  async handleCreateCourse(
    @User() user: UserWithoutPassword,
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const createdCourseDbRecord =
      await this.coursesDbService.createCourseConnectedToUserAndReturnIt(
        createCourseDto,
        user.id,
      );
    return mapCourseDbRecordToCourse(createdCourseDbRecord);
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
