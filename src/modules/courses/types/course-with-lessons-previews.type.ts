import { ApiProperty } from '@nestjs/swagger';

import { Course } from './course.type';

import { LessonPreview } from '../../lessons/types/lesson-preview.type';

export class CourseWithLessonsPreviews extends Course {
  @ApiProperty()
  readonly lessonsPreviews: Array<LessonPreview>;
}
