import { UserWithoutPassword } from '../../users/types/user-without-password.type';

export type UserPayload = Omit<UserWithoutPassword, 'createdAt' | 'modifiedAt'>;
