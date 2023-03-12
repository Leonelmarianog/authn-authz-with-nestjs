import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '../post/post.module';
import { UserProfile } from './application/mapper/user.profile';
import { ROLE_REPOSITORY } from './application/repository/role.repository.interface';
import { USER_REPOSITORY } from './application/repository/user.repository.interface';
import { AUTH_PROVIDER_SERVICE } from './application/service/auth-provider.service.interface';
import { AuthService } from './application/service/auth.service';
import { CaslAbilityFactory } from './infrastructure/casl/casl-ability.factory';
import { PolicyHandlerStorage } from './infrastructure/storage/policy-handler.storage';
import { UpdatePostPolicyHandler } from './application/policy/post/update-post.policy';
import { CognitoService } from './infrastructure/cognito/cognito.service';
import { PermissionSchema } from './infrastructure/database/permission.schema';
import { RoleRepository } from './infrastructure/database/role.repository';
import { RoleSchema } from './infrastructure/database/role.schema';
import { UserRepository } from './infrastructure/database/user.repository';
import { UserSchema } from './infrastructure/database/user.schema';
import { PolicyAuthGuard } from './infrastructure/guard/policy-auth.guard';
import { JwtStrategy } from './infrastructure/passport/jwt.strategy';
import { AuthController } from './interface/auth.controller';
import { UserController } from './interface/user.controller';
import { ReadPostPolicyHandler } from './application/policy/post/read-post.policy';
import { CreatePostPolicyHandler } from './application/policy/post/create-post.policy';
import { DeletePostPolicyHandler } from './application/policy/post/delete-post.policy';
import { ReadUserPolicyHandler } from './application/policy/user/read-user.policy';
import { CreateUserPolicyHandler } from './application/policy/user/create-user.policy';
import { UpdateUserPolicyHandler } from './application/policy/user/update-user.policy';
import { DeleteUserPolicyHandler } from './application/policy/user/delete-user.policy';
import { UserService } from './application/service/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema, RoleSchema, PermissionSchema]), PostModule],
  controllers: [AuthController, UserController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PolicyAuthGuard,
    },
    UserProfile,
    AuthService,
    UserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepository,
    },
    {
      provide: AUTH_PROVIDER_SERVICE,
      useClass: CognitoService,
    },
    JwtStrategy,
    CaslAbilityFactory,
    PolicyHandlerStorage,
    ReadPostPolicyHandler,
    CreatePostPolicyHandler,
    UpdatePostPolicyHandler,
    DeletePostPolicyHandler,
    ReadUserPolicyHandler,
    CreateUserPolicyHandler,
    UpdateUserPolicyHandler,
    DeleteUserPolicyHandler,
  ],
  exports: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
  ],
})
export class AuthModule {}
