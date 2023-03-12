import { Req, Get, Controller, Inject, Delete, Post, Param, Body } from '@nestjs/common';
import { CheckPolicies } from '../application/decorator/check-policies.decorator';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserPolicy } from '../application/policy/user/create-user.policy';
import { DeleteUserPolicy } from '../application/policy/user/delete-user.policy';
import { ReadUserPolicy } from '../application/policy/user/read-user.policy';
import { IUserRepository, USER_REPOSITORY } from '../application/repository/user.repository.interface';
import { UserService } from '../application/service/user.service';
import { User } from '../domain/user.entity';

@Controller('/api/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {}

  @Get('/')
  @CheckPolicies(new ReadUserPolicy())
  async getAll(): Promise<User[]> {
    return this.userRepository.getAll();
  }

  @Get('me')
  @CheckPolicies(new ReadUserPolicy())
  async getMe(@Req() req: Request & { user: User }): Promise<User> {
    return req.user;
  }

  @Get(':id')
  @CheckPolicies(new ReadUserPolicy())
  async getOneByIdOrFail(@Param('id') id: number): Promise<User> {
    return this.userRepository.getOneByIdOrFail(id);
  }

  @Post('/')
  @CheckPolicies(new CreateUserPolicy())
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @Delete(':id')
  @CheckPolicies(new DeleteUserPolicy())
  async delete(@Param('id') id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
