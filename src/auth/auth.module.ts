import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtService } from './jwt.service';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, UsersService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
