import { Injectable } from '@nestjs/common';
import { CognitoUserAttribute, CognitoUserPool } from 'amazon-cognito-identity-js';
import { IAuthProviderService, SignUpFields } from '../../application/service/auth-provider.service.interface';

@Injectable()
export class CognitoService implements IAuthProviderService {
  private readonly userPool: CognitoUserPool;

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
      ClientId: process.env.AWS_COGNITO_CLIENT_ID,
      endpoint: process.env.AWS_COGNITO_ENDPOINT,
    });
  }

  async signUp(fields: SignUpFields): Promise<string> {
    const { firstName, lastName, email, username, password } = fields;

    const requiredUserAttributes = [
      new CognitoUserAttribute({
        Name: 'given_name',
        Value: firstName,
      }),
      new CognitoUserAttribute({
        Name: 'family_name',
        Value: lastName,
      }),
      new CognitoUserAttribute({
        Name: 'email',
        Value: email,
      }),
    ];

    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, requiredUserAttributes, null, (error, result) => {
        if (error) {
          return reject(error);
        }

        return resolve(result.userSub);
      });
    });
  }
}
