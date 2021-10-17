import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_POOL } from '../db/constants';
import { CourseDbRecord } from './types/course-db-record';
import { CreateCourseDto } from './dtos/create-course.dto';
import { COURSES_TABLE_NAME, LECTURES_TABLE_NAME } from './courses.config';
import { ModifyCourseDto } from './dtos/modify-course.dto';

@Injectable()
export class CoursesService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async getAllCoursesFromDb(): Promise<Array<CourseDbRecord>> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
        SELECT
          *
        FROM
          "${COURSES_TABLE_NAME}";
      `,
      )
      .then(({ rows }) => rows);
  }

  async getCourseByIdFromDb(courseId: string): Promise<CourseDbRecord> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
        SELECT
          *
        FROM
          "${COURSES_TABLE_NAME}"
        WHERE id=$1
        FETCH FIRST ROW ONLY;
      `,
        [courseId],
      )
      .then(({ rowCount, rows }) => {
        if (rowCount === 1) {
          return rows[0];
        }

        throw new NotFoundException('Course was not found!');
      });
  }

  async addCourseToDb(
    createCourseDto: CreateCourseDto,
  ): Promise<CourseDbRecord> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
        INSERT INTO "${COURSES_TABLE_NAME}" (
          title,
          description,
          want_to_improve
        )
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
        [
          createCourseDto.title,
          createCourseDto.description,
          createCourseDto.wantToImprove,
        ],
      )
      .then(({ rows: [createdCourse] }) => createdCourse);
  }

  async deleteCourseFromDb(courseId: string): Promise<CourseDbRecord> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
          DELETE FROM
            "${COURSES_TABLE_NAME}"
          WHERE
            id=$1
          RETURNING *;
        `,
        [courseId],
      )
      .then(({ rowCount, rows }) => {
        if (rowCount === 1) {
          return rows[0];
        }

        throw new NotFoundException('Course was not found!');
      });
  }

  async checkIfCourseHasLecture(
    courseId: string,
    lectureId: string,
  ): Promise<boolean> {
    return this.dbPool
      .query<{ exists: boolean }>(
        `
          SELECT EXISTS (
            SELECT
              true
            FROM
              "${LECTURES_TABLE_NAME}"
            WHERE
              course_id=$1
            AND
              id=$2
          );
      `,
        [courseId, lectureId],
      )
      .then(({ rows: [{ exists }] }) => exists);
  }

  async modifyCourse(
    courseId: string,
    modifyCourseDto: ModifyCourseDto,
  ): Promise<CourseDbRecord> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
          UPDATE
            "${COURSES_TABLE_NAME}"
          SET
            title = $1,
            description = $2,
            want_to_improve = $3
          WHERE
            id = $4
          RETURNING *;
        `,
        [
          modifyCourseDto.title,
          modifyCourseDto.description,
          modifyCourseDto.wantToImprove,
          courseId,
        ],
      )
      .then(({ rows }) => rows[0]);
  }
}
