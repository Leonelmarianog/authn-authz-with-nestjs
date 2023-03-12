import { ExecutionContext, Injectable, Type, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { CHECK_POLICIES_KEY } from '../../application/decorator/check-policies.decorator';
import { IS_PUBLIC_KEY } from '../../application/decorator/public.decorator';
import IRequestWithUser from '../../application/interface/request-with-user.interface';
import { IPolicy } from '../../application/policy/policy.interface';

import { PolicyHandlerStorage } from '../storage/policy-handler.storage';

@Injectable()
export class PolicyAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector, private readonly policyHandlerStorage: PolicyHandlerStorage) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const isPublic = this.getDecoratorMetadata<boolean>(context, IS_PUBLIC_KEY);

    if (isPublic) {
      return true;
    }

    try {
      await super.canActivate(context);
    } catch (error) {
      return false;
    }

    const policies = this.getDecoratorMetadata<IPolicy[]>(context, CHECK_POLICIES_KEY);

    if (policies) {
      try {
        await Promise.all(
          policies.map((policy) => {
            const policyHandler = this.policyHandlerStorage.get(policy.constructor as Type);
            return policyHandler.handle(this.getRequestFromContext(context));
          }),
        );
      } catch (error) {
        throw new ForbiddenException(error.message);
      }
    }

    return true;
  }

  private getDecoratorMetadata<T>(context: ExecutionContext, key: string): T {
    return this.reflector.getAllAndOverride(key, [context.getHandler(), context.getClass()]);
  }

  private getRequestFromContext(context: ExecutionContext): IRequestWithUser {
    return context.switchToHttp().getRequest<IRequestWithUser>();
  }
}
