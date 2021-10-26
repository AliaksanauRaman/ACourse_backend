import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { LessonType } from '../types/lesson-type.type';

export class CreateLessonDto {
  @IsUUID('4')
  readonly courseId: string;

  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsEnum(LessonType)
  readonly type: LessonType;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  constructor(
    courseId: string,
    title: string,
    type: LessonType,
    description: string,
  ) {
    this.courseId = courseId;
    this.title = title;
    this.type = type;
    this.description = description;
  }
}
