import { ParseUUIDPipe } from '@nestjs/common';

export const UUIDValidatorPipe = new ParseUUIDPipe({ version: '4' });
