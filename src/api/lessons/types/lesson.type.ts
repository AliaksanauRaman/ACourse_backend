import { ApiProperty } from '@nestjs/swagger';

import { LessonType } from './lesson-type.type';

export class Lesson {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly courseId: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly type: LessonType;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly modifiedAt: Date;
}
