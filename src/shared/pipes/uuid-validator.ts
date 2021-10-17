import { ParseUUIDPipe } from '@nestjs/common';

import { UUID_VERSION } from '../../constants';

export const UUIDValidatorPipe = new ParseUUIDPipe({ version: UUID_VERSION });
