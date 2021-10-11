import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { PG_POOL } from '../db/constants';
import { CreateLectureDto } from './dtos/create-lecture.dto';
import { Lecture } from './types/lecture';
import { LECTURES_TABLE_NAME } from './courses.config';
import { LectureDbRecord } from './types/lecture-db-record';

@Injectable()
export class LecturesService {
  constructor(@Inject(PG_POOL) private readonly dbPool: Pool) {}

  // TODO
  async getAllCourseLectures(courseId: string): Promise<Array<Lecture>> {
    return [];
  }

  async createCourseLectures(
    courseId: string,
    listOfCreateLectureDto: Array<CreateLectureDto>,
  ): Promise<Array<LectureDbRecord>> {
    const queryString = generateQueryForMultipleLecturesInsertion(
      courseId,
      listOfCreateLectureDto,
    );
    const allValuesToInsert = getAllValuesToInsert(
      courseId,
      listOfCreateLectureDto,
    );
    return this.dbPool
      .query<LectureDbRecord>(queryString, allValuesToInsert)
      .then(({ rows }) => rows);
  }
}

const getAllValuesToInsert = (
  courseId: string,
  listOfCreateLectureDto: Array<CreateLectureDto>,
): Array<unknown> =>
  listOfCreateLectureDto
    .map(({ title, description }) => [courseId, title, description])
    .flat(1);

const generateQueryForMultipleLecturesInsertion = (
  courseId: string,
  listOfCreateLectureDto: Array<CreateLectureDto>,
): string => {
  const allValuesToInsert = getAllValuesToInsert(
    courseId,
    listOfCreateLectureDto,
  );

  const queryString = `
    INSERT INTO "${LECTURES_TABLE_NAME}" (course_id, title, description)
    VALUES ${generateQueryStringPartForValuesInsertion(
      listOfCreateLectureDto.length,
      allValuesToInsert.length / listOfCreateLectureDto.length,
    )}
      RETURNING *;
  `;

  return getQueryStringWithProperValuesPlaceholders(
    queryString,
    allValuesToInsert,
  );
};

const generateQueryStringPartForValuesInsertion = (
  amountOfRowsToInsert: number,
  amountOfValuesForEachRow: number,
  valuePlaceholder = '?',
): string =>
  new Array(amountOfRowsToInsert)
    .fill(undefined)
    .map(
      () =>
        `(${new Array(amountOfValuesForEachRow)
          .fill(valuePlaceholder)
          .join(', ')})`,
    )
    .join(', ');

const getQueryStringWithProperValuesPlaceholders = (
  queryString: string,
  allValues: Array<unknown>,
  currentValuePlaceholder = '?',
): string =>
  allValues.reduce<string>(
    (resultQueryString, _, index) =>
      resultQueryString.replace(currentValuePlaceholder, `$${index + 1}`),
    queryString,
  );
