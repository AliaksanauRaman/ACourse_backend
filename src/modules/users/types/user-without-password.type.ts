import { ApiProperty } from '@nestjs/swagger';

export class UserWithoutPassword {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly createdAt: Date;

  @ApiProperty()
  readonly modifiedAt: Date;
}
