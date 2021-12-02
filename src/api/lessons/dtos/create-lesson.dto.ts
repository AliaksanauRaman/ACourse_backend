import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { LessonType } from '../types/lesson-type.type';

export class CreateLessonDto {
  @ApiProperty({ type: String, minLength: 36, maxLength: 36 })
  @IsUUID('4')
  readonly courseId: string;

  @ApiProperty({ minLength: 1, maxLength: 60 })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @ApiProperty({ enum: LessonType })
  @IsEnum(LessonType)
  readonly type: LessonType;

  // TODO: Make max field length to 255 in sql
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
