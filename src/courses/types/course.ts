import { isObject } from '../../shared/utils/is-object';
import { isString } from '../../shared/utils/is-string';
import { isDate } from '../../shared/utils/is-date';
import { isBoolean } from '../../shared/utils/is-boolean';

export type Course = {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly wantToImprove: boolean;
  readonly createdAt: Date;
  readonly modifiedAt: Date;
};

export const isCourse = (value: unknown): value is Course =>
  isObject(value) &&
  isString(value.id) &&
  isString(value.title) &&
  isString(value.description) &&
  isBoolean(value.wantToImprove) &&
  isDate(value.createdAt) &&
  isDate(value.modifiedAt);
