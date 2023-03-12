import { Post } from '../../domain/post.entity';

export const POST_REPOSITORY = 'POST_REPOSITORY';

export interface IPostRepository {
  getAll(): Promise<Post[]>;
  getOneByIdOrFail(id: number): Promise<Post>;
  create(post: Post): Promise<Post>;
  updateOrFail(post: Post): Promise<Post>;
  delete(id: number): Promise<void>;
}
