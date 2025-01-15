import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @MinLength(4)
    @MaxLength(12)
    password?: string;

}
