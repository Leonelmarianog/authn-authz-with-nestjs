import { AutoMap } from '@automapper/classes';
import { Post } from '../../../module/post/domain/post.entity';
import { BaseEntity } from '../../../common/domain/base.entity';
import { Role } from './role.entity';

export class User extends BaseEntity {
  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  email: string;

  @AutoMap()
  username: string;

  @AutoMap()
  password: string;

  @AutoMap()
  authProviderId: string;

  @AutoMap()
  role: Role;

  @AutoMap(() => [Post])
  posts: Post[];

  setAuthProviderId(authProviderId: string): this {
    this.authProviderId = authProviderId;
    return this;
  }

  setRole(role: Role): this {
    this.role = role;
    return this;
  }
}
