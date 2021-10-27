import { LessonType } from './lesson-type.type';

export type LessonDbRecord = {
  readonly id: string;
  readonly course_id: string;
  readonly title: string;
  readonly type: LessonType;
  readonly description: string;
  readonly created_at: Date;
  readonly modified_at: Date;
};
