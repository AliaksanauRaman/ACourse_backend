import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { ModifyLessonDto } from '../dtos/modify-lesson.dto';
import { LessonDbRecord } from '../types/lesson-db-record.type';

export interface ILessonsDbService {
  selectLessonById: (lessonId: string) => Promise<LessonDbRecord | null>;
  insertLesson: (createLessonDto: CreateLessonDto) => Promise<LessonDbRecord>;
  updateLesson: (
    lessonId: string,
    modifyLessonDto: ModifyLessonDto,
  ) => Promise<LessonDbRecord | null>;
  deleteLesson: (lessonId: string) => Promise<LessonDbRecord | null>;
}
