import { LessonType } from './lesson-type.type';

export type Lesson = {
  readonly id: string;
  readonly courseId: string;
  readonly title: string;
  readonly type: LessonType;
  readonly description: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};
