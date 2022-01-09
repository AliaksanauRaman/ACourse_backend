import { Course } from '../types/course.type';
import { CourseDbRecord } from '../types/course-db-record.type';

export const mapCourseDbRecordToCourse = (
  dbRecord: CourseDbRecord,
): Course => ({
  id: dbRecord.id,
  title: dbRecord.title,
  description: dbRecord.description,
  wantToImprove: dbRecord.want_to_improve,
  creatorId: dbRecord.creator_id,
  createdAt: dbRecord.created_at,
  modifiedAt: dbRecord.modified_at,
});
