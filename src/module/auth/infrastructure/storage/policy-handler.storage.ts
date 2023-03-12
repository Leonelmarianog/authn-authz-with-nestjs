import { Injectable } from '@nestjs/common';
import { IPolicy } from '../../application/policy/policy.interface';
import { IPolicyHandler } from '../../application/policy/policy-handler.interface';

@Injectable()
export class PolicyHandlerStorage {
  private readonly collection = new Map<IPolicy, IPolicyHandler>();

  add(policy: IPolicy, handler: IPolicyHandler) {
    this.collection.set(policy, handler);
  }

  get(policy: IPolicy): IPolicyHandler {
    const handler = this.collection.get(policy);

    if (!handler) {
      throw new Error(`"${policy.name}" does not have the associated handler.`);
    }

    return handler;
  }
}
