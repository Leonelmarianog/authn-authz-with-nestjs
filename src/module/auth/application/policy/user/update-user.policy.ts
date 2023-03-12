import { Inject, Injectable } from '@nestjs/common';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import IRequestWithUser from '../../interface/request-with-user.interface';
import { IUserRepository, USER_REPOSITORY } from '../../repository/user.repository.interface';

export class UpdateUserPolicy implements IPolicy {
  name = 'UpdateUserPolicy';
}

@Injectable()
export class UpdateUserPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
    @Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository,
  ) {
    this.policyHandlerStorage.add(UpdateUserPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user: reqUser, body } = request;
    const user = await this.userRepository.getOneByIdOrFail(body.id);
    const userAbility = this.caslAbilityFactory.createForUser(reqUser);
    const hasAbility = userAbility.can(AuthAction.UPDATE, user);

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.UPDATE} this user`);
    }
  }
}
