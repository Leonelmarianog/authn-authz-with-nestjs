import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AssignRoleDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsString()
  @IsNotEmpty()
  role: string;
}
