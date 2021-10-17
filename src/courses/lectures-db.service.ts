import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_POOL } from '../db/constants';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { COURSES_TABLE_NAME, LECTURES_TABLE_NAME } from './courses.config';
import { LectureDbRecord } from './types/lecture-db-record';

@Injectable()
export class LecturesDbService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async getAllCourseLecturesFromDb(
    courseId: string,
  ): Promise<Array<LectureDbRecord>> {
    return this.dbPool
      .query<LectureDbRecord>(
        `
        SELECT
          "${LECTURES_TABLE_NAME}"."id",
          "${LECTURES_TABLE_NAME}"."course_id",
          "${LECTURES_TABLE_NAME}"."title",
          "${LECTURES_TABLE_NAME}"."description",
          "${LECTURES_TABLE_NAME}"."created_at",
          "${LECTURES_TABLE_NAME}"."modified_at"
        FROM
          "${COURSES_TABLE_NAME}"
        LEFT JOIN
          "${LECTURES_TABLE_NAME}"
        ON
          "${COURSES_TABLE_NAME}"."id"="${LECTURES_TABLE_NAME}"."course_id"
        WHERE
          "${COURSES_TABLE_NAME}"."id"=$1
        AND
          "${LECTURES_TABLE_NAME}"."id" IS NOT NULL;
      `,
        [courseId],
      )
      .then(({ rows }) => rows);
  }

  async addLectureToDb(
    courseId: string,
    createLectureDto: CreateLectureDto,
  ): Promise<LectureDbRecord> {
    return this.dbPool
      .query<LectureDbRecord>(
        `
          INSERT INTO "${LECTURES_TABLE_NAME}" (
            course_id,
            title,
            description
          )
          VALUES ($1, $2, $3)
          RETURNING *;
        `,
        [courseId, createLectureDto.title, createLectureDto.description],
      )
      .then(({ rows: [createdLecture] }) => createdLecture);
  }

  async deleteLectureFromDb(
    courseId: string,
    lectureId: string,
  ): Promise<LectureDbRecord> {
    return this.dbPool
      .query<LectureDbRecord>(
        `
          DELETE FROM
            "${LECTURES_TABLE_NAME}"
          WHERE
            course_id=$1
          AND
            id=$2
          RETURNING *;
        `,
        [courseId, lectureId],
      )
      .then(({ rows, rowCount }) => {
        if (rowCount === 1) {
          return rows[0];
        }

        throw new NotFoundException('Lecture was not found!');
      });
  }
}
