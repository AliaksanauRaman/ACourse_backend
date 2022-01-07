import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserWithoutPassword } from '../../users/types/user-without-password.type';
import { UsersDbService } from '../../users/users-db.service';
import { mapUserDbRecordWithoutPasswordToUser } from '../../users/utils/map-user-db-record-without-password-to-user';

import { JwtPayload } from '../types/jwt-payload.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersDbService: UsersDbService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(jwtPayload: JwtPayload): Promise<UserWithoutPassword> {
    const userWithoutPassword =
      await this.usersDbService.findUserWithoutPasswordByIdOrReturnNull(
        jwtPayload.sub,
      );

    if (userWithoutPassword === null) {
      throw new UnauthorizedException();
    }

    return mapUserDbRecordWithoutPasswordToUser(userWithoutPassword);
  }
}
