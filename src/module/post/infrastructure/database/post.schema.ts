import { EntitySchema } from 'typeorm';
import { Post } from '../../domain/post.entity';

export const PostSchema = new EntitySchema<Post>({
  name: 'Post',
  target: Post,
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: true,
    },
    text: {
      type: 'text',
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
    owner: {
      target: 'User',
      type: 'many-to-one',
      inverseSide: 'posts',
      joinColumn: {
        name: 'fk_user_id',
      },
    },
  },
});
