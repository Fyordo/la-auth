import {Body, Controller, HttpStatus, Post, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("/register")
    async register(@Body() body, @Res() response) {
        let registerResult = await this.authService.register(body.login, body.password, body.avatarUrl);
        return response.status(201).json(registerResult)
    }

    @Post("/login")
    async login(@Body() body, @Res() response) {
        let authResult = await this.authService.login(body.login, body.password);
        return response.status(200).json(authResult)
    }
}
