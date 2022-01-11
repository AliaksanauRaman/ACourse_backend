import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { Endpoint } from '../../constants/endpoints';
import { UserWithoutPassword } from '../users/types/user-without-password.type';
import { User } from '../../shared/decorators/user.decorator';

import { AuthenticationService } from './authentication.service';
import { CredentialsAuthenticationGuard } from './guards/credentials-authentication.guard';
import { JwtAuthenticationGuard } from './guards/jwt-authentication.guard';
import { UserCredentialsDto } from './dtos/user-credentials.dto';
import { UserLoginResponse } from './types/user-login-response.type';
import { UnauthorizedError } from './types/unauthorized-error.type';

@ApiTags(Endpoint.AUTHENTICATION)
@Controller(`api/${Endpoint.AUTHENTICATION}`)
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(JwtAuthenticationGuard)
  @Get('/current-user')
  async handleGetCurrentUserByJwt(
    @User() user: UserWithoutPassword,
  ): Promise<UserWithoutPassword> {
    return user;
  }

  @ApiBody({ type: UserCredentialsDto })
  @ApiCreatedResponse({ type: UserLoginResponse })
  @ApiUnauthorizedResponse({ type: UnauthorizedError })
  @UseGuards(CredentialsAuthenticationGuard)
  @Post('/login')
  async handleUserLoginByCredentials(
    @User() user: UserWithoutPassword,
  ): Promise<UserLoginResponse> {
    const accessToken =
      await this.authenticationService.generateJwtByUserPayload(user);
    return { accessToken };
  }
}
