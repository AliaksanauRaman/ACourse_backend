import { OmitType } from '@nestjs/mapped-types';

import { CreateLessonDto } from './create-lesson.dto';

export class ModifyLessonDto extends OmitType(CreateLessonDto, ['courseId']) {}
