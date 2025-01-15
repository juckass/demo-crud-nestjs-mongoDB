import { IsEmail, IsString, MinLength,IsNotEmpty, MaxLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(12)
    password: string;
}
