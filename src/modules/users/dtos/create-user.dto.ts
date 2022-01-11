import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

import { UserInputLimitation } from '../../../constants/user-input-limitation';

export class CreateUserDto {
  @ApiProperty({
    minLength: 1,
    maxLength: UserInputLimitation.FIRST_NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.FIRST_NAME_MAX_LENGTH)
  readonly first_name: string;

  @ApiProperty({
    minLength: 1,
    maxLength: UserInputLimitation.LAST_NAME_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.LAST_NAME_MAX_LENGTH)
  readonly last_name: string;

  @ApiProperty({
    minLength: 1,
    maxLength: UserInputLimitation.EMAIL_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(UserInputLimitation.EMAIL_MAX_LENGTH)
  readonly email: string;

  @ApiProperty({
    minLength: 1,
    maxLength: UserInputLimitation.PASSWORD_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.PASSWORD_MAX_LENGTH)
  readonly password: string;
}
