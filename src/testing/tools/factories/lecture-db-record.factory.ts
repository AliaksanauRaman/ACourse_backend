import { Factory } from 'fishery';
import { v4 as uuid } from 'uuid';
import { LectureDbRecord } from '../../../courses/types/lecture-db-record.type';

export const lectureDbRecordFactory = Factory.define<LectureDbRecord>(() => ({
  id: uuid(),
  course_id: uuid(),
  title: 'Lecture title',
  description: 'Lecture description',
  created_at: new Date(),
  modified_at: new Date(),
}));
