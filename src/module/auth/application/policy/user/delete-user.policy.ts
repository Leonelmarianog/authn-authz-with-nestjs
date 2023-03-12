import { Inject, Injectable } from '@nestjs/common';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import IRequestWithUser from '../../interface/request-with-user.interface';
import { IUserRepository, USER_REPOSITORY } from '../../repository/user.repository.interface';

export class DeleteUserPolicy implements IPolicy {
  name = 'DeleteUserPolicy';
}

@Injectable()
export class DeleteUserPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {
    this.policyHandlerStorage.add(DeleteUserPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user: reqUser, params } = request;
    const user = await this.userRepository.getOneByIdOrFail(+params.id);
    const userAbility = this.caslAbilityFactory.createForUser(reqUser);
    const hasAbility = userAbility.can(AuthAction.DELETE, user);

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.DELETE} this user`);
    }
  }
}
