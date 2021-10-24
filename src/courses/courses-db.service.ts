import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { ICoursesDbService } from './interfaces/courses-db-service.interface';
import { DB_POOL } from '../db/constants';
import { CourseDbRecord } from './types/course-db-record';
import { CreateCourseDto } from './dtos/create-course.dto';
import { COURSES_TABLE_NAME, LECTURES_TABLE_NAME } from './courses.config';
import { ModifyCourseDto } from './dtos/modify-course.dto';

@Injectable()
export class CoursesDbService implements ICoursesDbService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async selectAllCourses(): Promise<Array<CourseDbRecord>> {
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

  async checkIfCourseExists(courseId: string): Promise<boolean> {
    return this.dbPool
      .query<{ exists: boolean }>(
        `
          SELECT EXISTS (
            SELECT
              true
            FROM
              "${COURSES_TABLE_NAME}"
            WHERE
              id=$1
          );
        `,
        [courseId],
      )
      .then(({ rows: [{ exists }] }) => exists);
  }

  async selectCourseById(courseId: string): Promise<CourseDbRecord | null> {
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
      .then(({ rowCount, rows }) => (rowCount === 1 ? rows[0] : null));
  }

  async insertCourse(
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

  async deleteCourse(courseId: string): Promise<CourseDbRecord | null> {
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
      .then(({ rowCount, rows }) => (rowCount === 1 ? rows[0] : null));
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
  ): Promise<CourseDbRecord | null> {
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
      .then(({ rowCount, rows }) => (rowCount === 1 ? rows[0] : null));
  }
}
