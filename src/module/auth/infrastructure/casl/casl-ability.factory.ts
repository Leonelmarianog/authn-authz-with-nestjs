import { defineAbility, AnyMongoAbility } from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User } from '../../domain/user.entity';

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: User): AnyMongoAbility {
    const { permissions } = user.role;

    console.log(`----- Permissions of user ${user.username} with ID ${user.id} -----`);
    console.table(permissions);

    return defineAbility((can) => {
      permissions.forEach((permission) => {
        can(permission.action, permission.subject, permission.parseCondition(user));
      });
    });
  }
}
