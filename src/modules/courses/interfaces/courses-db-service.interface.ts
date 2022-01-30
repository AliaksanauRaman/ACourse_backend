import { CreateCourseDto } from '../dtos/create-course.dto';
import { ModifyCourseDto } from '../dtos/modify-course.dto';
import { CourseDbRecord } from '../types/course-db-record.type';
import { CoursePreview } from '../types/course-preview.type';
import { LessonPreview } from '../../lessons/types/lesson-preview.type';

export const COURSES_DB_SERVICE = Symbol('COURSES_DB_SERVICE');

export interface ICoursesDbService {
  selectUserCourses(userId: number): Promise<Array<CourseDbRecord>>;
  getCoursePreviewById(courseId: string): Promise<CoursePreview>;
  getCourseLessonsPreviews(courseId: string): Promise<Array<LessonPreview>>;
  createCourseConnectedToUserAndReturnIt(
    createCourseDto: CreateCourseDto,
    courseCreatorId: number,
  ): Promise<CourseDbRecord>;
  deleteCourse(courseId: string): Promise<CourseDbRecord | null>;
  updateCourse(
    courseId: string,
    modifyCourseDto: ModifyCourseDto,
  ): Promise<CourseDbRecord | null>;
  checkIfCourseExists(courseId: string): Promise<boolean>;
  checkIfCourseHasLesson(courseId: string, lessonId: string): Promise<boolean>;
}
