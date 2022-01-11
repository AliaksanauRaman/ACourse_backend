import { ApiProperty } from '@nestjs/swagger';
import { UnauthorizedError } from './unauthorized-error.type';

export class UnauthorizedErrorWithMessage extends UnauthorizedError {
  @ApiProperty({ required: false })
  readonly message?: string;
}
