import { isDate } from '../../shared/utils/is-date';
import { isObject } from '../../shared/utils/is-object';
import { isString } from '../../shared/utils/is-string';

export type LectureDbRecord = {
  readonly id: string;
  readonly course_id: string;
  readonly title: string;
  readonly description: string;
  readonly created_at: Date;
  readonly modified_at: Date;
};

export const isLectureDbRecord = (value: unknown): value is LectureDbRecord =>
  isObject(value) &&
  isString(value.id) &&
  isString(value.course_id) &&
  isString(value.title) &&
  isString(value.description) &&
  isDate(value.created_at) &&
  isDate(value.modified_at);
