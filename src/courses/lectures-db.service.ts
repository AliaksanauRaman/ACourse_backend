import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_POOL } from '../db/constants';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { ModifyLectureDto } from './dtos/modify-lecture.dto';
import { LECTURES_TABLE_NAME } from './courses.config';
import { LectureDbRecord } from './types/lecture-db-record';

@Injectable()
export class LecturesDbService {
  // TODO: Add modify lecture functionality
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async selectAllCourseLectures(
    courseId: string,
  ): Promise<Array<LectureDbRecord>> {
    return this.dbPool
      .query<LectureDbRecord>(
        `
          SELECT
            *
          FROM
            "${LECTURES_TABLE_NAME}"
          WHERE
            course_id=$1;
        `,
        [courseId],
      )
      .then(({ rows }) => rows);
  }

  async selectCourseLectureById(
    courseId: string,
    lectureId: string,
  ): Promise<LectureDbRecord> {
    return this.dbPool
      .query<LectureDbRecord>(
        `
          SELECT
            *
          FROM
            "${LECTURES_TABLE_NAME}"
          WHERE
            course_id=$1
          AND
            id=$2
          FETCH FIRST ROW ONLY;
        `,
        [courseId, lectureId],
      )
      .then(({ rowCount, rows }) => {
        if (rowCount === 1) {
          return rows[0];
        }

        throw new NotFoundException('Lecture was not found!');
      });
  }

  async insertLecture(
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

  async deleteLecture(
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

  async modifyLecture(
    courseId: string,
    lectureId: string,
    modifyLectureDto: ModifyLectureDto,
  ): Promise<LectureDbRecord> {
    return this.dbPool
      .query<LectureDbRecord>(
        `
          UPDATE
            "${LECTURES_TABLE_NAME}"
          SET title = $1,
              description = $2
          WHERE
            course_id=$3
          AND
            id=$4
          RETURNING *;
        `,
        [
          modifyLectureDto.title,
          modifyLectureDto.description,
          courseId,
          lectureId,
        ],
      )
      .then(({ rows, rowCount }) => {
        if (rowCount === 1) {
          return rows[0];
        }

        throw new NotFoundException('Lecture was not found!');
      });
  }
}
