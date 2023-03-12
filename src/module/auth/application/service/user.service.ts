import { Inject, Injectable } from '@nestjs/common';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { AUTH_PROVIDER_SERVICE, IAuthProviderService } from './auth-provider.service.interface';
import { IUserRepository, USER_REPOSITORY } from '../repository/user.repository.interface';
import { User } from '../../domain/user.entity';
import { CreateUserDto } from '../dto/create-user.dto';
import { IRoleRepository, ROLE_REPOSITORY } from '../repository/role.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject(AUTH_PROVIDER_SERVICE) private readonly authProviderService: IAuthProviderService,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: IRoleRepository,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    let user = this.mapper.map(createUserDto, CreateUserDto, User);
    user.setRole(await this.roleRepository.getOneByNameOrFail(createUserDto.roleName));
    user = await this.userRepository.create(user);
    user.setAuthProviderId(await this.authProviderService.signUp(user));
    return this.userRepository.updateOrFail(user);
  }
}
