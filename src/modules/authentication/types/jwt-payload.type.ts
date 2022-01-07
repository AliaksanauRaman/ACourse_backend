export type JwtPayload = Readonly<{
  sub: number;
  firstName: string;
  lastName: string;
  email: string;
}>;
