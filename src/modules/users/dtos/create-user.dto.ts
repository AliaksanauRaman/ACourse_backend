import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { UserInputLimitation } from '../../../constants/user-input-limitation';

export class CreateUserDto {
  @ApiProperty({
    default: 'John',
    minLength: 1,
    maxLength: UserInputLimitation.FIRST_NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.FIRST_NAME_MAX_LENGTH)
  readonly firstName: string;

  @ApiProperty({
    default: 'Snow',
    minLength: 1,
    maxLength: UserInputLimitation.LAST_NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.LAST_NAME_MAX_LENGTH)
  readonly lastName: string;

  @ApiProperty({
    default: 'john.snow@gmail.com',
    minLength: 1,
    maxLength: UserInputLimitation.EMAIL_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(UserInputLimitation.EMAIL_MAX_LENGTH)
  readonly email: string;

  @ApiProperty({
    default: 'kingofthenorth',
    minLength: 1,
    maxLength: UserInputLimitation.PASSWORD_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.PASSWORD_MAX_LENGTH)
  readonly password: string;
}
