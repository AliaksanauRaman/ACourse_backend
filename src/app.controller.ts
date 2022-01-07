import { Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AppService } from './app.service';
import { AuthenticationService } from './authentication/authentication.service';
import { JwtAuthenticationGuard } from './authentication/guards/jwt-authentication.guard';
import { CredentialsAuthenticationGuard } from './authentication/guards/credentials-authentication.guard';
import { User } from './shared/decorators/user.decorator';
import { UserWithoutPassword } from './users/types/user-without-password.type';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get()
  handleGetWelcomeMessage(): string {
    return this.appService.getWelcomeMessage();
  }

  @UseGuards(CredentialsAuthenticationGuard)
  @Post('/login')
  async login(
    @User() user: UserWithoutPassword,
  ): Promise<{ accessToken: string }> {
    const accessToken =
      await this.authenticationService.generateJwtByUserPayload(user);
    return { accessToken };
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get('/profile')
  async getProfile(
    @User() user: UserWithoutPassword,
  ): Promise<UserWithoutPassword> {
    return user;
  }
}
