import { Injectable } from '@nestjs/common';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import { Post } from '../../../../../module/post/domain/post.entity';
import IRequestWithUser from '../../interface/request-with-user.interface';

export class CreatePostPolicy implements IPolicy {
  name = 'CreatePostPolicy';
}

@Injectable()
export class CreatePostPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {
    this.policyHandlerStorage.add(CreatePostPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user } = request;
    const userAbility = this.caslAbilityFactory.createForUser(user);
    const hasAbility = userAbility.can(AuthAction.CREATE, new Post());

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.CREATE} this post`);
    }
  }
}
