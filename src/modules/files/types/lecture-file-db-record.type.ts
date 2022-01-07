import { AbstractFileDbRecord } from './abstract-file-db-record.type';

export type LectureFileDbRecord = AbstractFileDbRecord & {
  readonly lecture_id: string;
};
