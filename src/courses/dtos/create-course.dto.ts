import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateLectureDto } from './create-lecture.dto';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  readonly wantToImprove: boolean;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateLectureDto)
  readonly lectures: Array<CreateLectureDto>;
}
