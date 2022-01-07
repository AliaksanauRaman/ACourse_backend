import { Factory } from 'fishery';
import { v4 as uuid } from 'uuid';
import { LessonDbRecord } from '../../../modules/lessons/types/lesson-db-record.type';
import { LessonType } from '../../../modules/lessons/types/lesson-type.type';

export const lessonDbRecordFactory = Factory.define<LessonDbRecord>(() => ({
  id: uuid(),
  type: LessonType.LECTURE,
  course_id: uuid(),
  title: 'Lecture title',
  description: 'Lecture description',
  created_at: new Date(),
  modified_at: new Date(),
}));
