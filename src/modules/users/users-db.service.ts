import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

import { DB_POOL } from '../db/tokens/db-pool.token';
import { USERS_TABLE_NAME } from '../db/tables-names.constants';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserDbRecordWithoutPassword } from './types/user-db-record-without-password.type';
import { UserDbRecord } from './types/user-db-record.type';

@Injectable()
export class UsersDbService {
  constructor(
    @Inject(DB_POOL)
    private readonly dbPool: Pool,
  ) {}

  async findUserByEmailOrReturnNull(
    userEmail: string,
  ): Promise<UserDbRecord | null> {
    return this.dbPool
      .query<UserDbRecord>(
        `
        SELECT
          *
        FROM
          ${USERS_TABLE_NAME}
        WHERE
          email = $1;
      `,
        [userEmail],
      )
      .then(({ rows, rowCount }) => (rowCount === 1 ? rows[0] : null));
  }

  async findUserWithoutPasswordByIdOrReturnNull(
    userId: number,
  ): Promise<UserDbRecordWithoutPassword | null> {
    return this.dbPool
      .query<UserDbRecordWithoutPassword>(
        `
        SELECT
          id,
          first_name,
          last_name,
          email,
          created_at,
          modified_at
        FROM
          ${USERS_TABLE_NAME}
        WHERE
          id = $1;
      `,
        [userId],
      )
      .then(({ rows, rowCount }) => (rowCount === 1 ? rows[0] : null));
  }

  async createUserAndReturnCreatedUserWithoutPassword(
    createUserDto: CreateUserDto,
  ): Promise<UserDbRecordWithoutPassword> {
    return this.dbPool
      .query<UserDbRecordWithoutPassword>(
        `
        INSERT INTO ${USERS_TABLE_NAME} (
          first_name,
          last_name,
          email,
          password
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, first_name, last_name, email, created_at, modified_at;
      `,
        [
          createUserDto.firstName,
          createUserDto.lastName,
          createUserDto.email,
          createUserDto.password,
        ],
      )
      .then(
        ({ rows: [createdUserDbRecordWithoutPassword] }) =>
          createdUserDbRecordWithoutPassword,
      );
  }
}
