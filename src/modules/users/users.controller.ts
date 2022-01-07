import { Body, Controller, Inject, Post } from '@nestjs/common';

import {
  ENCRYPTION_SERVICE,
  IEncryptionService,
} from '../../shared/services/encryption';

import { UsersDbService } from './users-db.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserWithoutPassword } from './types/user-without-password.type';
import { mapUserDbRecordWithoutPasswordToUser } from './utils/map-user-db-record-without-password-to-user';

@Controller('api/users')
export class UsersController {
  constructor(
    @Inject(ENCRYPTION_SERVICE)
    private readonly encryptionService: IEncryptionService,
    private readonly usersDbService: UsersDbService,
  ) {}

  // TODO: Handle duplicated emails!
  @Post('/register')
  async handleUserRegistration(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserWithoutPassword> {
    const hashedPassword = await this.encryptionService.hashString(
      createUserDto.password,
    );

    const createdUserWithourPasswordDbRecord =
      await this.usersDbService.createUserAndReturnCreatedUserWithoutPassword({
        ...createUserDto,
        password: hashedPassword,
      });

    return mapUserDbRecordWithoutPasswordToUser(
      createdUserWithourPasswordDbRecord,
    );
  }
}
