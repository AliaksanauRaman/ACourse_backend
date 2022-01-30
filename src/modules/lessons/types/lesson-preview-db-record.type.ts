import { LessonDbRecord } from './lesson-db-record.type';

export type LessonPreviewDbRecord = Omit<LessonDbRecord, 'courseId'>;
