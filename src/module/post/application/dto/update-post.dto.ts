import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AutoMap } from '@automapper/classes';

export class UpdatePostDto {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  @AutoMap()
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @AutoMap()
  text?: string;
}
