import { AutoMap } from '@automapper/classes';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @AutoMap()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @AutoMap()
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  @AutoMap()
  email: string;

  @IsString()
  @IsNotEmpty()
  @AutoMap()
  username: string;

  @IsString()
  @IsNotEmpty()
  @AutoMap()
  password: string;

  @IsString()
  @IsNotEmpty()
  roleName: string;
}
