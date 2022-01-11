import { ApiProperty } from '@nestjs/swagger';

export class UnauthorizedError {
  @ApiProperty({ default: 401 })
  readonly statusCode: number;

  @ApiProperty({ required: false })
  readonly message?: string;

  @ApiProperty({ default: 'Unauthorized' })
  readonly error: string;
}
