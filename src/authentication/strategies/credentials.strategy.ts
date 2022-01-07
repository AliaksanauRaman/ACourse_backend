import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { UserWithoutPassword } from '../../modules/users/types/user-without-password.type';
import { mapUserDbRecordWithoutPasswordToUser } from '../../modules/users/utils/map-user-db-record-without-password-to-user';

import { AuthenticationService } from '../authentication.service';

@Injectable()
export class CredentialsStrategy extends PassportStrategy(
  Strategy,
  'credentials',
) {
  constructor(private readonly authenticationService: AuthenticationService) {
    super({
      usernameField: 'email',
    });
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserWithoutPassword> {
    try {
      const userWithoutPassword =
        await this.authenticationService.loginUserByCredentials(
          email,
          password,
        );

      return mapUserDbRecordWithoutPasswordToUser(userWithoutPassword);
    } catch (error: unknown) {
      throw new UnauthorizedException(
        error instanceof Error ? error.message : '',
      );
    }
  }
}
