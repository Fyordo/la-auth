import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly appService: AuthService) {}

  @Get("/auth/register")
  register(): string {
    return this.appService.getHello();
  }
}
