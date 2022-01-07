import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserWithoutPassword } from '../../users/types/user-without-password.type';

export const User = createParamDecorator(
  (_: unknown, context: ExecutionContext) => {
    const request = context
      .switchToHttp()
      .getRequest<{ user: UserWithoutPassword }>();
    return request.user;
  },
);
