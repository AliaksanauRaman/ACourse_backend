import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_POOL } from '../../../db/constants';

import { IDbLessonsService } from '../interfaces/db-lessons-service.interface';
import { CreateLessonDto } from '../dtos/create-lesson.dto';
import { LessonDbRecord } from '../types/lesson-db-record.type';
import { LESSONS_TABLE_NAME } from '../lessons.constants';
import { ModifyLessonDto } from '../dtos/modify-lesson.dto';

@Injectable()
export class DbLessonsService implements IDbLessonsService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

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
            description,
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
            course_id=$4
          AND
            id=$5
          RETURNING *;
        `,
        [
          modifyLessonDto.title,
          modifyLessonDto.type,
          modifyLessonDto.description,
          modifyLessonDto.courseId,
          lessonId,
        ],
      )
      .then(({ rows, rowCount }) => (rowCount === 1 ? rows[0] : null));
  }
}