import { Injectable } from '@nestjs/common';
import { AuthAction } from '../../../domain/auth-action.enum';
import { IPolicy } from '../policy.interface';
import { IPolicyHandler } from '../policy-handler.interface';
import { PolicyHandlerStorage } from '../../../infrastructure/storage/policy-handler.storage';
import { CaslAbilityFactory } from '../../../infrastructure/casl/casl-ability.factory';
import { User } from '../../../domain/user.entity';
import IRequestWithUser from '../../interface/request-with-user.interface';

export class ReadUserPolicy implements IPolicy {
  name = 'ReadUserPolicy';
}

@Injectable()
export class ReadUserPolicyHandler implements IPolicyHandler {
  constructor(
    private readonly caslAbilityFactory: CaslAbilityFactory,
    private readonly policyHandlerStorage: PolicyHandlerStorage,
  ) {
    this.policyHandlerStorage.add(ReadUserPolicy, this);
  }

  async handle(request: IRequestWithUser): Promise<void> {
    const { user } = request;
    const userAbility = this.caslAbilityFactory.createForUser(user);
    const hasAbility = userAbility.can(AuthAction.READ, new User());

    if (!hasAbility) {
      throw new Error(`User with ID ${user.id} can not ${AuthAction.READ} this user`);
    }
  }
}
