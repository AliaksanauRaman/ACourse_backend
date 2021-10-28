import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @IsBoolean()
  readonly wantToImprove: boolean;

  constructor(title: string, description: string, wantToImprove: boolean) {
    this.title = title;
    this.description = description;
    this.wantToImprove = wantToImprove;
  }
}
