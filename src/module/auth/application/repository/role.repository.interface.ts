import { Role } from '../../domain/role.entity';

export const ROLE_REPOSITORY = 'ROLE_REPOSITORY';

export interface IRoleRepository {
  getOneByNameOrFail(name: string): Promise<Role>;
}
