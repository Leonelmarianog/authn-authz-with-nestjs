import { EntitySchema } from 'typeorm';
import { Role } from '../../domain/role.entity';

export const RoleSchema = new EntitySchema<Role>({
  name: 'Role',
  target: Role,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    name: {
      type: String,
    },
    createdAt: {
      type: Date,
      createDate: true,
    },
    updatedAt: {
      type: Date,
      createDate: true,
    },
    deletedAt: {
      type: Date,
      deleteDate: true,
    },
  },
  relations: {
    permissions: {
      target: 'Permission',
      type: 'many-to-many',
      joinTable: {
        name: 'role_permission',
        joinColumn: {
          name: 'fk_role_id',
        },
        inverseJoinColumn: {
          name: 'fk_permission_id',
        },
      },
    },
  },
});
