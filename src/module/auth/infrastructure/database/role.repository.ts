import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { IRoleRepository } from '../../application/repository/role.repository.interface';
import { Role } from '../../domain/role.entity';

@Injectable()
export class RoleRepository implements IRoleRepository {
  private readonly repository: Repository<Role>;

  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(Role);
  }

  async getOneByNameOrFail(name: string): Promise<Role> {
    const role = await this.repository.findOneBy({ name });

    if (!role) {
      throw new NotFoundException(`Role ${name} not found`);
    }

    return role;
  }
}
