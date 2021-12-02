import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { LessonType } from '../types/lesson-type.type';

export class ModifyLessonDto {
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
