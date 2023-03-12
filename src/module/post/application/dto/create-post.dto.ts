import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  text: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}
