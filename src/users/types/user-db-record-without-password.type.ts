import { UserDbRecord } from './user-db-record.type';

export type UserDbRecordWithoutPassword = Omit<UserDbRecord, 'password'>;
