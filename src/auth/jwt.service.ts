import * as jwt from 'jsonwebtoken';
import {UserDto} from "../users/user.dto";

export class JwtService {
    private secret = 'your_secret_key'; // Замените на свой секретный ключ

    async generateToken(userData: UserDto) {
        return jwt.sign(userData, this.secret);
    }

    async verifyToken(token: string) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return null;
        }
    }
}