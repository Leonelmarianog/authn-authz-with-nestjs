import { EntitySchema } from 'typeorm';
import { Permission } from '../../domain/permission.entity';

export const PermissionSchema = new EntitySchema<Permission>({
  name: 'Permission',
  target: Permission,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    action: {
      type: String,
    },
    subject: {
      type: String,
    },
    condition: {
      type: 'text',
      nullable: true,
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
});
