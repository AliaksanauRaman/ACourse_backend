import { LessonDbRecord } from '../types/lesson-db-record.type';
import { Lesson } from '../types/lesson.type';

export const mapLessonDbRecordToLesson = (
  dbRecord: LessonDbRecord,
): Lesson => ({
  id: dbRecord.id,
  courseId: dbRecord.course_id,
  title: dbRecord.title,
  type: dbRecord.type,
  description: dbRecord.description,
  createdAt: dbRecord.created_at,
  modifiedAt: dbRecord.modified_at,
});
