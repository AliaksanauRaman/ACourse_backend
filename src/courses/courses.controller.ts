import { Controller, Get, Param } from '@nestjs/common';

@Controller('courses')
export class CoursesController {
  @Get('/')
  getAllCourses(): Array<any> {
    return [];
  }

  @Get('/:courseId')
  getCourseById(@Param('courseId') courseId: string): string {
    return courseId;
  }
}
