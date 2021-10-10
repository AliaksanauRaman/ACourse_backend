import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

import { PG_POOL } from '../db/pg-pool';
import { Course } from '../types/course';
import { CreateCourseDto } from '../types/create-course-dto';

const COURSES_TABLE_NAME = 'Courses';
@Injectable()
export class CoursesService {
  constructor(@Inject(PG_POOL) private readonly dbPool: Pool) {}

  async getAllCourses(): Promise<Array<Course>> {
    return this.dbPool
      .query<Course>(
        `
        SELECT *
        FROM "${COURSES_TABLE_NAME}";
      `,
      )
      .then(({ rows }) => rows)
      .then(
        (courses) => courses.map((course) => ({ ...course, lectures: [] })), // TODO
      );
  }

  async getCourseById(courseId: string): Promise<Course> {
    return this.dbPool
      .query<Course>(
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
          return {
            ...rows[0],
            lectures: [], // TODO
          };
        }

        throw new NotFoundException('Course with provided id was not found!');
      });
  }

  async createCourse(createCourseDto: CreateCourseDto): Promise<Course> {
    return this.dbPool
      .query<Course>(
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
      .then(({ rows }) => ({
        ...rows[0],
        lectures: [], // TODO
      }));
  }

  async deleteCourse(courseId: string): Promise<Course> {
    return this.dbPool
      .query<Course>(
        `
          DELETE FROM "${COURSES_TABLE_NAME}"
          WHERE id=$1
          RETURNING *;
        `,
        [courseId],
      )
      .then(({ rowCount, rows }) => {
        if (rowCount === 1) {
          return {
            ...rows[0],
            lectures: [], // TODO
          };
        }

        throw new NotFoundException('Course with provided id was not found!');
      });
  }
}
