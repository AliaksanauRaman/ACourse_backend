import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({ minLength: 1, maxLength: 60 })
  @IsString()
  @IsNotEmpty()
  readonly title: string;

  // TODO: Make max field length to 255 in sql
  @ApiProperty({ minLength: 1, maxLength: 255 })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty()
  @IsBoolean()
  readonly wantToImprove: boolean;
}
