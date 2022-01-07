import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ENCRYPTION_SERVICE } from '../../core/tokens/encryption-service.token';
import { IEncryptionService } from '../../core/interfaces/encryption-service.interface';

import { UserDbRecordWithoutPassword } from '../users/types/user-db-record-without-password.type';
import { UsersDbService } from '../users/users-db.service';

import { JwtPayload } from './types/jwt-payload.type';
import { UserPayload } from './types/user-payload.type';

@Injectable()
export class AuthenticationService {
  constructor(
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: IEncryptionService,
    private readonly usersDbService: UsersDbService,
    private readonly jwtService: JwtService,
  ) {}

  async loginUserByCredentials(
    email: string,
    password: string,
  ): Promise<UserDbRecordWithoutPassword> {
    const user = await this.usersDbService.findUserByEmailOrReturnNull(email);

    if (user === null) {
      throw new Error('User with such email does not exist!');
    }

    const passwordsMatch =
      await this.encryptionService.doStringAndHashedStringMatch(
        password,
        user.password,
      );

    if (passwordsMatch) {
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    throw new Error('Provided password is incorrect!');
  }

  async generateJwtByUserPayload(userPayload: UserPayload): Promise<string> {
    const jwtPayload: JwtPayload = {
      sub: userPayload.id,
      email: userPayload.email,
      firstName: userPayload.firstName,
      lastName: userPayload.lastName,
    };
    return this.jwtService.sign(jwtPayload);
  }
}
