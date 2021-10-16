import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';
import { DB_POOL } from '../db/constants';
import { LectureFileDbRecord } from './types/lecture-file-db-record';
import { generateFileName } from './utils/generate-file-name';
import { LECTURES_FILES_TABLE_NAME } from './files.config';

@Injectable()
export class FilesDbService {
  constructor(@Inject(DB_POOL) private readonly dbPool: Pool) {}

  async insertLectureFileRecord(
    lectureId: string,
    file: Express.Multer.File,
  ): Promise<LectureFileDbRecord> {
    return this.dbPool
      .query<LectureFileDbRecord>(
        `
        INSERT INTO "${LECTURES_FILES_TABLE_NAME}" (
          lecture_id,
          original_name,
          generated_name,
          mime_type,
          size
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
      `,
        [
          lectureId,
          file.originalname,
          generateFileName(file),
          file.mimetype,
          file.size,
        ],
      )
      .then(({ rows }) => rows[0]);
  }
}
