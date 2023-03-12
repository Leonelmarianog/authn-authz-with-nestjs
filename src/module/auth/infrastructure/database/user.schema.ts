import { EntitySchema } from 'typeorm';
import { User } from '../../domain/user.entity';

export const UserSchema = new EntitySchema<User>({
  name: 'User',
  target: User,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    authProviderId: {
      type: String,
      unique: true,
      nullable: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
    },
    username: {
      type: String,
      unique: true,
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
    posts: {
      target: 'Post',
      type: 'one-to-many',
      inverseSide: 'owner',
    },
    role: {
      target: 'Role',
      type: 'many-to-one',
      joinColumn: {
        name: 'fk_role_id',
      },
    },
  },
});
