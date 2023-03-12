import { Inject, Injectable } from '@nestjs/common';
import { IPostRepository, POST_REPOSITORY } from '../../../../post/application/repository/post.repository.interface';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import IRequestWithUser from '../../interface/request-with-user.interface';

export class DeletePostPolicy implements IPolicy {
  name = 'DeletePostPolicy';
}

@Injectable()
export class DeletePostPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
    @Inject(POST_REPOSITORY) private readonly postRepository: IPostRepository,
  ) {
    this.policyHandlerStorage.add(DeletePostPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user, params } = request;
    const post = await this.postRepository.getOneByIdOrFail(+params.id);
    const userAbility = this.caslAbilityFactory.createForUser(user);
    const hasAbility = userAbility.can(AuthAction.DELETE, post);

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.DELETE} this post`);
    }
  }
}
