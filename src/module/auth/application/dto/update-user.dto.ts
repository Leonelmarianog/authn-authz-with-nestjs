import { AutoMap } from '@automapper/classes';
import { IsEmail, IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @AutoMap()
  firstName?: string;

  @IsString()
  @IsOptional()
  @AutoMap()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  @AutoMap()
  email?: string;

  @IsString()
  @IsOptional()
  @AutoMap()
  username?: string;

  @IsString()
  @IsOptional()
  @AutoMap()
  password?: string;

  @IsString()
  @IsNotEmpty()
  roleName?: string;
}
