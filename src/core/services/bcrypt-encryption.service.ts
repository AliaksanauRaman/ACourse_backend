import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { IEncryptionService } from '../interfaces/encryption-service.interface';

@Injectable()
export class BcryptEncryptionService implements IEncryptionService {
  private readonly saltRounds = 10;

  async hashString(plainString: string): Promise<string> {
    return bcrypt.hash(plainString, this.saltRounds);
  }

  async doStringAndHashedStringMatch(
    plainString: string,
    hashedString: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainString, hashedString);
  }
}
