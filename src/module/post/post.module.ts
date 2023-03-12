import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { PostProfile } from './application/mapper/post.profile';
import { POST_REPOSITORY } from './application/repository/post.repository.interface';
import { PostRepository } from './infrastructure/database/post.repository';
import { PostSchema } from './infrastructure/database/post.schema';
import { PostController } from './interface/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostSchema]), forwardRef(() => AuthModule)],
  controllers: [PostController],
  providers: [PostProfile, { provide: POST_REPOSITORY, useClass: PostRepository }],
  exports: [{ provide: POST_REPOSITORY, useClass: PostRepository }],
})
export class PostModule {}
