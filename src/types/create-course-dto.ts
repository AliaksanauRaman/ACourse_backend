import { CreateLectureDto } from './create-lecture-dto';

export type CreateCourseDto = {
  title: string;
  description: string;
  wantToImprove: boolean;
  lectures: Array<CreateLectureDto>;
};
