import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CoursesService } from './courses.service';

import { Course } from '../types/course';
import { CreateCourseDto } from '../types/create-course-dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get('/')
  async handleGetAllCourses(): Promise<Array<Course>> {
    return this.coursesService.getAllCourses();
  }

  @Get('/:courseId')
  async handleGetCourseById(
    @Param('courseId') courseId: string,
  ): Promise<Course> {
    return this.coursesService.getCourseById(courseId);
  }

  @Post('/')
  async handleCreateCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    return this.coursesService.createCourse(createCourseDto);
  }

  @Patch('/:courseId')
  async handleModifyCourse(
    @Param('courseId') courseId: string,
    @Body() modifyCourseDto: Partial<CreateCourseDto>,
  ): Promise<Course> {
    return this.coursesService.modifyCourse(courseId, modifyCourseDto);
  }

  @Delete('/:courseId')
  async handleDeleteCourse(
    @Param('courseId') courseId: string,
  ): Promise<Course> {
    return this.coursesService.deleteCourse(courseId);
  }
}
