import { isObject } from '../../shared/utils/is-object';
import { isString } from '../../shared/utils/is-string';
import { isDate } from '../../shared/utils/is-date';

export type Lecture = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export const isLecture = (value: unknown): value is Lecture =>
  isObject(value) &&
  isString(value.id) &&
  isString(value.title) &&
  isString(value.description) &&
  isDate(value.createdAt) &&
  isDate(value.modifiedAt);
