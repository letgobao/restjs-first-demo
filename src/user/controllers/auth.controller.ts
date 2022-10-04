import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthInfo } from '../user.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createInfo: AuthInfo) {
    return await this.authService.register(createInfo);
  }

  @Post('login')
  async login(@Body() loginInfo: AuthInfo) {
    return await this.authService.login(loginInfo);
  }
}