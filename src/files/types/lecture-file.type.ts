import { AbstractFile } from './abstract-file.type';

export type LectureFile = AbstractFile & {
  readonly lectureId: string;
};
