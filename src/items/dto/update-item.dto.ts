import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create-item.dto';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateItemDto extends PartialType(CreateItemDto) {

    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(0)
    price?: number;

    @IsOptional()
    @IsString()
    description?: string;
}
