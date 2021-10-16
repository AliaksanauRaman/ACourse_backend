import { AbstractFileDbRecord } from './abstract-file-db-record';

export type LectureFileDbRecord = AbstractFileDbRecord & {
  readonly lecture_id: string;
};
