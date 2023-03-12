import { BaseEntity } from '../../../common/domain/base.entity';
import { AuthAction } from './auth-action.enum';
import { interpolation } from 'interpolate-json';

export class Permission extends BaseEntity {
  action: AuthAction;

  subject: string;

  condition?: string;

  parseCondition(source: Record<string, any>) {
    if (!this.condition) {
      return;
    }

    return JSON.parse(interpolation.expand(this.condition, { [source.constructor.name.toLowerCase()]: source }));
  }
}
