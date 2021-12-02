import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_POOL } from '../../../db/tokens/db-pool.token';
import { LESSONS_TABLE_NAME } from '../../../db/tables-names.constants';

import { ILessonsDbService } from '../interfaces/lessons-db-service.interface';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { LessonDbRecord } from '../types/lesson-db-record.type';
import { ModifyLessonDto } from '../dtos/modify-lesson.dto';

@Injectable()
export class PostgreSQLBasedLessonsDbService implements ILessonsDbService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async selectLessonById(lessonId: string): Promise<LessonDbRecord | null> {
    return this.dbPool
      .query<LessonDbRecord>(
        `
          SELECT
            *
          FROM
            "${LESSONS_TABLE_NAME}"
          WHERE
            id=$1
          FETCH FIRST ROW ONLY;
        `,
        [lessonId],
      )
      .then(({ rows, rowCount }) => (rowCount === 1 ? rows[0] : null));
  }

  async insertLesson(
    createLessonDto: CreateLessonDto,
  ): Promise<LessonDbRecord> {
    return this.dbPool
      .query<LessonDbRecord>(
        `
          INSERT INTO ${LESSONS_TABLE_NAME} (
            course_id,
            title,
            type,
            description
          )
          VALUES ($1, $2, $3, $4)
          RETURNING *;
        `,
        [
          createLessonDto.courseId,
          createLessonDto.title,
          createLessonDto.type,
          createLessonDto.description,
        ],
      )
      .then(({ rows: [createdLessonDbRecord] }) => createdLessonDbRecord);
  }

  async updateLesson(
    lessonId: string,
    modifyLessonDto: ModifyLessonDto,
  ): Promise<LessonDbRecord | null> {
    return this.dbPool
      .query<LessonDbRecord>(
        `
          UPDATE
            ${LESSONS_TABLE_NAME}
          SET title = $1,
              type = $2,
              description = $3
          WHERE
            id=$4
          RETURNING *;
        `,
        [
          modifyLessonDto.title,
          modifyLessonDto.type,
          modifyLessonDto.description,
          lessonId,
        ],
      )
      .then(({ rows, rowCount }) => (rowCount === 1 ? rows[0] : null));
  }

  async deleteLesson(lessonId: string): Promise<LessonDbRecord | null> {
    return this.dbPool
      .query<LessonDbRecord>(
        `
          DELETE FROM
            "${LESSONS_TABLE_NAME}"
          WHERE
            id=$1
          RETURNING *;
        `,
        [lessonId],
      )
      .then(({ rows, rowCount }) => (rowCount === 1 ? rows[0] : null));
  }
}
