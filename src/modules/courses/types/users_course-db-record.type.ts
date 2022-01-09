import { ApiProperty } from '@nestjs/swagger';

export class UsersCourseDbRecord {
  @ApiProperty()
  readonly user_id: number;

  @ApiProperty()
  readonly course_id: string;

  @ApiProperty()
  readonly created_at: Date;

  @ApiProperty()
  readonly modified_at: Date;
}
