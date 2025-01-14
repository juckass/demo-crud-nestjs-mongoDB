import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @MinLength(7)
    password?: string;

}
