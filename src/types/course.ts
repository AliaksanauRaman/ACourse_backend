import { Lecture } from './lecture';

export type Course = {
  id: string;
  title: string;
  description: string;
  wantToImprove: boolean;
  lectures: Array<Lecture>;
  createdAt: Date;
  modifiedAt: Date;
};
