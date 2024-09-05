import {Injectable, NotFoundException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {User} from "../users/user.entity";
import * as bcrypt from 'bcrypt';
import {WrongCredentialsException} from "../exceptions/wrongcredentials";
import {TokenResponse} from "./token.response";

@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}

    async login(login: string, password: string): Promise<TokenResponse> {
        let user: User = await this.userService.findByLogin(login);
        if (!user) {
            throw new NotFoundException(`User with login ${login} not found.`);
        }
        let passwordCheck: boolean = await bcrypt.compare(password, user.password);
        if (!passwordCheck) {
            throw new WrongCredentialsException(`Wrong login or password`);
        }

        return {
            token: null
        }
    }

    async register(login: string, password: string, avatarUrl: string): Promise<any> {
        let user: User = await this.userService.findByLogin(login);
        if (user) {
            throw new WrongCredentialsException(`User with login ${login} already exists.`);
        }
        await this.userService.createUser(login, password, avatarUrl);
    }
}
