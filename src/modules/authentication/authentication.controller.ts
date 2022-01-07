import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { UserWithoutPassword } from '../users/types/user-without-password.type';
import { User } from '../../shared/decorators/user.decorator';

import { AuthenticationService } from './authentication.service';
import { CredentialsAuthenticationGuard } from './guards/credentials-authentication.guard';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';

@Controller('api/auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('/current-user')
  async handleGetCurrentUserByJwt(
    @User() user: UserWithoutPassword,
  ): Promise<UserWithoutPassword> {
    return user;
  }

  @UseGuards(CredentialsAuthenticationGuard)
  @Post('/login')
  async handleLogin(
    @User() user: UserWithoutPassword,
  ): Promise<{ accessToken: string }> {
    const accessToken =
      await this.authenticationService.generateJwtByUserPayload(user);
    return { accessToken };
  }
}
