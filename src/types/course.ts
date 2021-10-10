import { Lecture } from './lecture';

export type Course = {
  id: string;
  title: string;
  description: string;
  want_to_improve: boolean;
  lectures: Array<Lecture>;
  created_at: Date;
  modified_at: Date;
};
