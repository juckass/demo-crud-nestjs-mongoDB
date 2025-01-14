import { IsEmail, IsString, MinLength,IsNotEmpty } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(7)
    password: string;
}
