import { Lesson } from './lesson.type';

export type LessonPreview = Omit<Lesson, 'courseId'>;
