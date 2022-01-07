import { ApiProperty } from '@nestjs/swagger';

import { UserWithoutPassword } from './user-without-password.type';

export class User extends UserWithoutPassword {
  @ApiProperty()
  readonly password: string;
}
