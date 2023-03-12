import { Injectable } from '@nestjs/common';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import { Post } from '../../../../../module/post/domain/post.entity';
import IRequestWithUser from '../../interface/request-with-user.interface';

export class ReadPostPolicy implements IPolicy {
  name = 'ReadPostPolicy';
}

@Injectable()
export class ReadPostPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {
    this.policyHandlerStorage.add(ReadPostPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user } = request;
    const userAbility = this.caslAbilityFactory.createForUser(user);
    const hasAbility = userAbility.can(AuthAction.READ, new Post());

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.READ} this post`);
    }
  }
}
