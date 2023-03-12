import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IPostRepository } from '../../application/repository/post.repository.interface';
import { Post } from '../../domain/post.entity';

@Injectable()
export class PostRepository implements IPostRepository {
  private readonly repository: Repository<Post>;

  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(Post);
  }

  async getAll(): Promise<Post[]> {
    return this.repository.find();
  }

  async getOneByIdOrFail(id: number): Promise<Post> {
    const post = await this.repository.findOne({ where: { id }, relations: { owner: true } });

    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }

    return post;
  }

  async create(post: Post): Promise<Post> {
    return this.repository.save(post);
  }

  async updateOrFail(post: Post): Promise<Post> {
    const exists = await this.repository.preload(post);

    if (!exists) {
      throw new NotFoundException(`Post with ID ${post.id} not found`);
    }

    return this.repository.save(exists);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
