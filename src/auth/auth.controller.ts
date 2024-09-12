import {Body, Controller, Get, HttpStatus, Post, Req, Res} from '@nestjs/common';
import {AuthService} from "./auth.service";

@Controller('/api/auth')
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

    @Get("/verify")
    async verify(@Req() request: Request, @Res() response) {
        let token = request.headers['authorization'].split(' ')[1];
        let verifyResult = await this.authService.verify(token);
        return response.status(200).json(verifyResult.id)
    }
}
