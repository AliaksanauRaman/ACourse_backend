import { ApiProperty } from '@nestjs/swagger';

export class UserLoginResponse {
  @ApiProperty()
  readonly accessToken: string;
}
