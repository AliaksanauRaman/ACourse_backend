import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ minLength: 1, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  readonly first_name: string;

  @ApiProperty({ minLength: 1, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  readonly last_name: string;

  @ApiProperty({ minLength: 1, maxLength: 70 })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  // maxLength here represents the maximum length of a password
  // from user, but not the actual maxLength of a password in the db
  @ApiProperty({ minLength: 1, maxLength: 50 })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
