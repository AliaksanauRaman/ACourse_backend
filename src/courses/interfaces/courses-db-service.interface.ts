import { CreateCourseDto } from '../dtos/create-course.dto';
import { ModifyCourseDto } from '../dtos/modify-course.dto';
import { CourseDbRecord } from '../types/course-db-record.type';

export interface ICoursesDbService {
  selectAllCourses(): Promise<Array<CourseDbRecord>>;
  selectCourseById(courseId: string): Promise<CourseDbRecord | null>;
  insertCourse(createCourseDto: CreateCourseDto): Promise<CourseDbRecord>;
  deleteCourse(courseId: string): Promise<CourseDbRecord | null>;
  modifyCourse(
    courseId: string,
    modifyCourseDto: ModifyCourseDto,
  ): Promise<CourseDbRecord | null>;
  checkIfCourseExists(courseId: string): Promise<boolean>;
  checkIfCourseHasLecture(
    courseId: string,
    lectureId: string,
  ): Promise<boolean>;
}
