import { IsNotEmpty, IsString } from 'class-validator';

export class CreateLectureDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;
}
