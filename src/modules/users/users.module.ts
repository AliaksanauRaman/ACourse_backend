import { Module } from '@nestjs/common';

import { DbModule } from '../db/db.module';

import {
  ENCRYPTION_SERVICE,
  BcryptEncryptionService,
} from '../../shared/services/encryption';

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
