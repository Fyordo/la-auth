export class UserDto {
    id: number
    login: string

    constructor(id: number, login: string) {
        this.id = id;
        this.login = login;
    }
}