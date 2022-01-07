import { UserWithoutPassword } from '../types/user-without-password.type';
import { UserDbRecordWithoutPassword } from '../types/user-db-record-without-password.type';

// TODO: Think about snake to camel case function
export const mapUserDbRecordWithoutPasswordToUser = (
  dbRecord: UserDbRecordWithoutPassword,
): UserWithoutPassword => {
  return {
    id: dbRecord.id,
    firstName: dbRecord.first_name,
    lastName: dbRecord.last_name,
    email: dbRecord.email,
    createdAt: dbRecord.created_at,
    modifiedAt: dbRecord.modified_at,
  };
};
