import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Inject, Param, Get, Post as PostVerb, Delete, Patch } from '@nestjs/common';
import { CreatePostDto } from '../application/dto/create-post.dto';
import { UpdatePostDto } from '../application/dto/update-post.dto';
import { IPostRepository, POST_REPOSITORY } from '../application/repository/post.repository.interface';
import { Post } from '../domain/post.entity';
import { CheckPolicies } from '../../auth/application/decorator/check-policies.decorator';
import { UpdatePostPolicy } from '../../auth/application/policy/post/update-post.policy';
import { ReadPostPolicy } from 'src/module/auth/application/policy/post/read-post.policy';
import { DeletePostPolicy } from 'src/module/auth/application/policy/post/delete-post.policy';
import { CreatePostPolicy } from 'src/module/auth/application/policy/post/create-post.policy';
import { IUserRepository, USER_REPOSITORY } from 'src/module/auth/application/repository/user.repository.interface';

@Controller('/api/post')
export class PostController {
  constructor(
    @Inject(POST_REPOSITORY) private readonly postRepository: IPostRepository,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
    @InjectMapper() private readonly classMapper: Mapper,
  ) {}

  @Get()
  @CheckPolicies(new ReadPostPolicy())
  async getAll(): Promise<Post[]> {
    return this.postRepository.getAll();
  }

  @Get(':id')
  @CheckPolicies(new ReadPostPolicy())
  async getOneByIdOrFail(@Param('id') id: number): Promise<Post> {
    return this.postRepository.getOneByIdOrFail(id);
  }

  @PostVerb('/')
  @CheckPolicies(new CreatePostPolicy())
  async create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    const post = this.classMapper.map(createPostDto, CreatePostDto, Post);
    post.owner = await this.userRepository.getOneByIdOrFail(createPostDto.userId);
    return this.postRepository.create(post);
  }

  @Patch()
  @CheckPolicies(new UpdatePostPolicy())
  async updateOrFail(@Body() updatePostDto: UpdatePostDto): Promise<Post> {
    return this.postRepository.updateOrFail(this.classMapper.map(updatePostDto, UpdatePostDto, Post));
  }

  @Delete(':id')
  @CheckPolicies(new DeletePostPolicy())
  async delete(@Param('id') id: number): Promise<void> {
    return this.postRepository.delete(id);
  }
}
