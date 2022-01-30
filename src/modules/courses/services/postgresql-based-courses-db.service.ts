import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

import { ICoursesDbService } from '../interfaces/courses-db-service.interface';
import { DB_POOL } from '../../db/tokens/db-pool.token';
import {
  COURSES_TABLE_NAME,
  DbTableName,
  LESSONS_TABLE_NAME,
} from '../../db/tables-names.constants';
import { CourseDbRecord } from '../types/course-db-record.type';
import { CreateCourseDto } from '../dtos/create-course.dto';
import { ModifyCourseDto } from '../dtos/modify-course.dto';
import { LessonDbRecord } from '../../lessons/types/lesson-db-record.type';
import { UsersCourseDbRecord } from '../types/users-course-db-record.type';

@Injectable()
export class PosrgreSQLBasedCoursesDbService implements ICoursesDbService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async selectUserCourses(userId: number): Promise<Array<CourseDbRecord>> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
          SELECT
            "${COURSES_TABLE_NAME}"."id",
            "${COURSES_TABLE_NAME}"."title",
            "${COURSES_TABLE_NAME}"."description",
            "${COURSES_TABLE_NAME}"."want_to_improve",
            "${COURSES_TABLE_NAME}"."created_at",
            "${COURSES_TABLE_NAME}"."modified_at"
          FROM
            "${COURSES_TABLE_NAME}"
          INNER JOIN
            "${DbTableName.USERS_COURSES}"
          ON
            "${COURSES_TABLE_NAME}"."id" = "${DbTableName.USERS_COURSES}"."course_id"
          WHERE
            "${DbTableName.USERS_COURSES}"."user_id" = $1
        `,
        [userId],
      )
      .then(({ rows }) => rows);
  }

  async getCoursePreviewById(courseId: string): Promise<CourseDbRecord> {
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

        throw new NotFoundException(
          `Course with id '${courseId}' is not found!`,
        );
      });
  }

  async selectAllCourseLessons(
    courseId: string,
  ): Promise<Array<LessonDbRecord>> {
    return this.dbPool
      .query<LessonDbRecord>(
        `
          SELECT
            *
          FROM
            "${LESSONS_TABLE_NAME}"
          WHERE
            course_id=$1;
        `,
        [courseId],
      )
      .then(({ rows }) => rows);
  }

  async createCourseConnectedToUserAndReturnIt(
    createCourseDto: CreateCourseDto,
    courseCreatorId: number,
  ): Promise<CourseDbRecord> {
    const insertedCourseDbRecord = await this.insertCourseAndReturnIt(
      createCourseDto,
      courseCreatorId,
    );
    await this.insertUserCourseConnectionAndReturnIt(
      courseCreatorId,
      insertedCourseDbRecord.id,
    );
    return insertedCourseDbRecord;
  }

  async updateCourse(
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

  async checkIfCourseHasLesson(
    courseId: string,
    lessonId: string,
  ): Promise<boolean> {
    return this.dbPool
      .query<{ exists: boolean }>(
        `
          SELECT EXISTS (
            SELECT
              true
            FROM
              "${LESSONS_TABLE_NAME}"
            WHERE
              course_id=$1
            AND
              id=$2
          );
        `,
        [courseId, lessonId],
      )
      .then(({ rows: [{ exists }] }) => exists);
  }

  private async insertCourseAndReturnIt(
    createCourseDto: CreateCourseDto,
    creatorId: number,
  ): Promise<CourseDbRecord> {
    return this.dbPool
      .query<CourseDbRecord>(
        `
          INSERT INTO "${COURSES_TABLE_NAME}" (
            title,
            description,
            want_to_improve,
            creator_id
          )
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `,
        [
          createCourseDto.title,
          createCourseDto.description,
          createCourseDto.wantToImprove,
          creatorId,
        ],
      )
      .then(({ rows: [insertedDbRecord] }) => insertedDbRecord);
  }

  private insertUserCourseConnectionAndReturnIt(
    userId: number,
    courseId: string,
  ): Promise<UsersCourseDbRecord> {
    return this.dbPool
      .query<UsersCourseDbRecord>(
        `
        INSERT INTO "${DbTableName.USERS_COURSES}" (
          user_id,
          course_id
        )
        VALUES ($1, $2)
        RETURNING *;
      `,
        [userId, courseId],
      )
      .then(({ rows: [insertedDbRecord] }) => insertedDbRecord);
  }
}
