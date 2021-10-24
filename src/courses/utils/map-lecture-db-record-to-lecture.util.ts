import { Lecture } from '../types/lecture.type';
import { LectureDbRecord } from '../types/lecture-db-record.type';

export const mapLectureDbRecordToLecture = (
  dbRecord: LectureDbRecord,
): Lecture => ({
  id: dbRecord.id,
  title: dbRecord.title,
  description: dbRecord.description,
  createdAt: dbRecord.created_at,
  modifiedAt: dbRecord.modified_at,
});
