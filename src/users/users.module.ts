import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';

import { BcryptEncryptionService } from '../core/services/bcrypt-encryption.service';
import { ENCRYPTION_SERVICE } from '../core/tokens/encryption-service.token';

import { UsersDbService } from './users-db.service';
import { UsersController } from './users.controller';

@Module({
  imports: [DbModule],
  providers: [
    UsersDbService,
    {
      provide: ENCRYPTION_SERVICE,
      useClass: BcryptEncryptionService,
    },
  ],
  exports: [UsersDbService],
  controllers: [UsersController],
})
export class UsersModule {}
