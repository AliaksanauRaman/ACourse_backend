import { Lecture } from '../types/lecture';
import { LectureDbRecord } from '../types/lecture-db-record';

export const mapLectureDbRecordToLecture = (
  dbRecord: LectureDbRecord,
): Lecture => ({
  id: dbRecord.id,
  title: dbRecord.title,
  description: dbRecord.description,
  createdAt: dbRecord.created_at,
  modifiedAt: dbRecord.modified_at,
});
