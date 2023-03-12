export const AUTH_PROVIDER_SERVICE = 'AUTH_PROVIDER_SERVICE';

export type SignUpFields = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export interface IAuthProviderService {
  signUp(fields: SignUpFields): Promise<string>;
}
