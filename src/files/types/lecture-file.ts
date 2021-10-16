import { AbstractFile } from './abstract-file';

export type LectureFile = AbstractFile & {
  readonly lectureId: string;
};
