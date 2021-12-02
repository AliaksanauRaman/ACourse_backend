import { NotFoundException } from '@nestjs/common';

import { LESSON_NOT_FOUND_MESSAGE } from './messages';

export const LESSON_NOT_FOUND_EXCEPTION = new NotFoundException(
  LESSON_NOT_FOUND_MESSAGE,
);
