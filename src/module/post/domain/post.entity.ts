import { User } from '../../../module/auth/domain/user.entity';
import { BaseEntity } from '../../../common/domain/base.entity';
import { AutoMap } from '@automapper/classes';

export class Post extends BaseEntity {
  @AutoMap()
  text: string;

  @AutoMap()
  owner: User;
}
