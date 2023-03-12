import { User } from '../../domain/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface IUserRepository {
  getAll(): Promise<User[]>;
  getOneByIdOrFail(id: number): Promise<User>;
  getOneByUsername(username: string): Promise<User>;
  create(user: User): Promise<User>;
  updateOrFail(user: User): Promise<User>;
  delete(id: number): Promise<void>;
}
