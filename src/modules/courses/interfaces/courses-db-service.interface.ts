import { CreateCourseDto } from '../dtos/create-course.dto';
import { ModifyCourseDto } from '../dtos/modify-course.dto';
import { LessonDbRecord } from '../../lessons/types/lesson-db-record.type';
import { CourseDbRecord } from '../types/course-db-record.type';

export const COURSES_DB_SERVICE = Symbol('COURSES_DB_SERVICE');

export interface ICoursesDbService {
  selectUserCourses(userId: number): Promise<Array<CourseDbRecord>>;
  getCoursePreviewById(courseId: string): Promise<CourseDbRecord | null>;
  selectAllCourseLessons(courseId: string): Promise<Array<LessonDbRecord>>;
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
