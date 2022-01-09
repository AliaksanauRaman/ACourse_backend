import { ApiProperty } from '@nestjs/swagger';

export class Course {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly wantToImprove: boolean;

  @ApiProperty()
  readonly creatorId: number;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly modifiedAt: Date;
}
