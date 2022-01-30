import { CourseWithLessonsPreviews } from '../types/course-with-lessons-previews.type';

export const COURSES_SERVICE = Symbol('COURSES_SERVICE');

export interface ICoursesService {
  getCourseWithLessonsPreviews(
    courseId: string,
  ): Promise<CourseWithLessonsPreviews>;
}
