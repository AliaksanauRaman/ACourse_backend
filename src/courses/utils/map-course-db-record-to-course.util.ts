import { Course } from '../types/course.type';
import { CourseDbRecord } from '../types/course-db-record.type';

export const mapCourseDbRecordToCourse = (
  dbRecord: CourseDbRecord,
): Course => ({
  id: dbRecord.id,
  title: dbRecord.title,
  description: dbRecord.description,
  wantToImprove: dbRecord.want_to_improve,
  createdAt: dbRecord.created_at,
  modifiedAt: dbRecord.modified_at,
});
