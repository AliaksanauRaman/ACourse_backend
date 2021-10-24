import { isDate } from '../../shared/utils/is-date.util';
import { isObject } from '../../shared/utils/is-object.util';
import { isString } from '../../shared/utils/is-string.util';

export type LectureDbRecord = {
  readonly id: string;
  readonly course_id: string;
  readonly title: string;
  readonly description: string;
  readonly created_at: Date;
  readonly modified_at: Date;
};

// TODO: Not used
export const isLectureDbRecord = (value: unknown): value is LectureDbRecord =>
  isObject(value) &&
  isString(value.id) &&
  isString(value.course_id) &&
  isString(value.title) &&
  isString(value.description) &&
  isDate(value.created_at) &&
  isDate(value.modified_at);
