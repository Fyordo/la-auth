import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

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
        const newUser = this.userRepository.create({login, password, avatarUrl});
        return await this.userRepository.save(newUser);
    }

    async findAllUsers(filter: Object): Promise<User[]> {
        return await this.userRepository.findBy(filter);
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
