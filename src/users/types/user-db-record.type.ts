export type UserDbRecord = Readonly<{
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  created_at: Date;
  modified_at: Date;
}>;
