import { CreateCourseDto } from '../dtos/create-course.dto';
import { ModifyCourseDto } from '../dtos/modify-course.dto';
import { LessonDbRecord } from '../../lessons/types/lesson-db-record.type';
import { CourseDbRecord } from '../types/course-db-record.type';

export interface ICoursesDbService {
  selectUserCourses(userId: number): Promise<Array<CourseDbRecord>>;
  selectCourseById(courseId: string): Promise<CourseDbRecord | null>;
  selectAllCourseLessons(courseId: string): Promise<Array<LessonDbRecord>>;
  insertCourse(createCourseDto: CreateCourseDto): Promise<CourseDbRecord>;
  deleteCourse(courseId: string): Promise<CourseDbRecord | null>;
  updateCourse(
    courseId: string,
    modifyCourseDto: ModifyCourseDto,
  ): Promise<CourseDbRecord | null>;
  checkIfCourseExists(courseId: string): Promise<boolean>;
  checkIfCourseHasLesson(courseId: string, lessonId: string): Promise<boolean>;
}
