import { SetMetadata } from '@nestjs/common';
import { IPolicy } from '../policy/policy.interface';

export const CHECK_POLICIES_KEY = 'CHECK_POLICY';

export const CheckPolicies = (...policies: IPolicy[]) => SetMetadata(CHECK_POLICIES_KEY, policies);
