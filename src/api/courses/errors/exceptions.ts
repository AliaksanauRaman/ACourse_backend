import { NotFoundException } from '@nestjs/common';

import { COURSE_NOT_FOUND_MESSAGE } from './messages';

export const COURSE_NOT_FOUND_EXCEPTION = new NotFoundException(
  COURSE_NOT_FOUND_MESSAGE,
);
