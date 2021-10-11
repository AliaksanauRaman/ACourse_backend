import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

import { PG_POOL } from '../db/constants';
import { mapCourseDbRecordToCourse } from '../utils/map-course-db-record-to-course';
import { CourseDbRecord } from '../types/course-db-record';
import { Course } from '../types/course';
import { CreateCourseDto } from '../types/create-course-dto';

const COURSES_TABLE_NAME = 'Courses';
@Injectable()
export class CoursesService {
  constructor(@Inject(PG_POOL) private readonly dbPool: Pool) {}

  async getAllCourses(): Promise<Array<Course>> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
        SELECT *
        FROM "${COURSES_TABLE_NAME}";
      `,
      )
      .then(({ rows }) => rows.map(mapCourseDbRecordToCourse));
  }

  async getCourseById(courseId: string): Promise<Course> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
        SELECT *
        FROM "${COURSES_TABLE_NAME}"
        WHERE id=$1
        FETCH FIRST ROW ONLY
      `,
        [courseId],
      )
      .then(({ rowCount, rows }) => {
        if (rowCount === 1) {
          return mapCourseDbRecordToCourse(rows[0]);
        }

        throw new NotFoundException('Course with provided id was not found!');
      });
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
        INSERT INTO "${COURSES_TABLE_NAME}" (title, description, want_to_improve)
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
        [
          createCourseDto.title,
          createCourseDto.description,
          createCourseDto.wantToImprove,
        ],
      )
      .then(({ rows }) => mapCourseDbRecordToCourse(rows[0]));
  }

  async deleteCourse(courseId: string): Promise<Course> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
          DELETE FROM "${COURSES_TABLE_NAME}"
          WHERE id=$1
          RETURNING *;
        `,
        [courseId],
      )
      .then(({ rowCount, rows }) => {
        if (rowCount === 1) {
          return mapCourseDbRecordToCourse(rows[0]);
        }

        throw new NotFoundException('Course with provided id was not found!');
      });
  }
}
