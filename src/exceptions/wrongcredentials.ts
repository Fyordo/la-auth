import {RuntimeException} from "@nestjs/core/errors/exceptions";

export class WrongCredentialsException extends RuntimeException {
}