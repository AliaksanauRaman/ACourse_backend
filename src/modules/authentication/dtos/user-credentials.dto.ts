import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserInputLimitation } from 'src/constants/user-input-limitation';

export class UserCredentialsDto {
  @ApiProperty({
    default: 'some.email@gmail.com',
    minLength: 1,
    maxLength: UserInputLimitation.EMAIL_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.EMAIL_MAX_LENGTH)
  readonly email: string;

  @ApiProperty({
    default: '12345678',
    minLength: 1,
    maxLength: UserInputLimitation.PASSWORD_MAX_LENGTH,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(UserInputLimitation.PASSWORD_MAX_LENGTH)
  readonly password: string;
}
