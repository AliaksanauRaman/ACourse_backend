import { Factory } from 'fishery';
import { v4 as uuid } from 'uuid';
import { CourseDbRecord } from '../../../courses/types/course-db-record.type';

export const courseDbRecordFactory = Factory.define<CourseDbRecord>(() => ({
  id: uuid(),
  title: 'Course title',
  description: 'Course description',
  want_to_improve: false,
  created_at: new Date(),
  modified_at: new Date(),
}));
