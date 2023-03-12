import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository, POST_REPOSITORY } from '../../../../post/application/repository/post.repository.interface';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import IRequestWithUser from '../../interface/request-with-user.interface';

export class UpdatePostPolicy implements IPolicy {
  name = 'UpdatePostPolicy';
}

@Injectable()
export class UpdatePostPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
    @Inject(POST_REPOSITORY) private readonly postRepository: IPostRepository,
  ) {
    this.policyHandlerStorage.add(UpdatePostPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user, body } = request;
    const post = await this.postRepository.getOneByIdOrFail(body.id);
    const userAbility = this.caslAbilityFactory.createForUser(user);
    const hasAbility = userAbility.can(AuthAction.UPDATE, post);

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.UPDATE} this post`);
    }
  }
}
