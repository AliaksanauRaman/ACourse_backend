import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { ModifyLessonDto } from '../dtos/modify-lesson.dto';
import { LessonDbRecord } from '../types/lesson-db-record.type';

export interface IDbLessonsService {
  insertLesson: (createLessonDto: CreateLessonDto) => Promise<LessonDbRecord>;
  updateLesson: (
    lessonId: string,
    modifyLessonDto: ModifyLessonDto,
  ) => Promise<LessonDbRecord | null>;
}
