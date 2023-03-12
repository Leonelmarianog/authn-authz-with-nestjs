import { BaseEntity } from '../../../common/domain/base.entity';
import { Permission } from './permission.entity';

export class Role extends BaseEntity {
  name: string;

  permissions: Permission[];
}
