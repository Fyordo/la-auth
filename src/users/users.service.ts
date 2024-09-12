import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {
    }

    async createUser(
        login: string,
        password: string,
        avatarUrl: string
    ): Promise<User> {
        const salt = await bcrypt.genSalt();
        const hashedPassword: string = await bcrypt.hash(password, salt);
        const newUser: User = this.userRepository.create({
            login,
            password: hashedPassword,
            avatarUrl
        });
        return await this.userRepository.save(newUser);
    }

    async findAllUsers(filter: Object): Promise<User[]> {
        return await this.userRepository.findBy(filter);
    }

    async findByLogin(login: string): Promise<User> {
        return await this.userRepository.findOneBy({login: login});
    }

    async findById(id: number): Promise<User> {
        return await this.userRepository.findOneBy({id: id});
    }

    async updateUser(id: number, login: string, password: string, avatarUrl: string): Promise<User> {
        const updatedUser = await this.userRepository.preload({id, login, password, avatarUrl});
        if (!updatedUser) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
        return await this.userRepository.save(updatedUser);
    }

    async deleteUser(id: number) {
        const result = await this.userRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found.`);
        }
    }
}
