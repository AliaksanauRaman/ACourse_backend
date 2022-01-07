import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { BcryptEncryptionService } from '../core/services/bcrypt-encryption.service';
import { ENCRYPTION_SERVICE } from '../core/tokens/encryption-service.token';
import { UsersModule } from '../users/users.module';
import { AuthenticationService } from './authentication.service';
import { CredentialsStrategy } from './strategies/credentials.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthenticationController } from './authentication.controller';

@Module({
  providers: [
    AuthenticationService,
    CredentialsStrategy,
    JwtStrategy,
    {
      provide: ENCRYPTION_SERVICE,
      useClass: BcryptEncryptionService,
    },
  ],
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '30m' },
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthenticationController],
})
export class AuthenticationModule {}
