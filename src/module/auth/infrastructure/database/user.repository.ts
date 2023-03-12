import { NotFoundException } from '@nestjs/common';
import { Injectable } from '@nestjs/common/decorators';
import { DataSource } from 'typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { IUserRepository } from '../../../auth/application/repository/user.repository.interface';
import { User } from '../../domain/user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<User>;

  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(User);
  }

  async getAll(): Promise<User[]> {
    return this.repository.find({ relations: { role: { permissions: true } } });
  }

  async getOneByIdOrFail(id: number): Promise<User> {
    const user = await this.repository.findOne({ where: { id }, relations: { role: { permissions: true } } });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async getOneByUsername(username: string): Promise<User> {
    return this.repository.findOne({ where: { username }, relations: { role: { permissions: true } } });
  }

  async create(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async updateOrFail(user: User): Promise<User> {
    const updated = await this.repository.preload(user);

    if (!updated) {
      throw new NotFoundException(`User with ID ${user.id} not found`);
    }

    return this.repository.save(updated);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
