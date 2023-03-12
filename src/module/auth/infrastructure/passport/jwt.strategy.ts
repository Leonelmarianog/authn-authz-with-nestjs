import { Injectable, Inject } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { passportJwtSecret } from 'jwks-rsa';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { IUserRepository, USER_REPOSITORY } from '../../application/repository/user.repository.interface';

export interface AccessTokenDto {
  sub: string;
  iss: string;
  client_id: string;
  origin_jti: string;
  event_id: string;
  token_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject(USER_REPOSITORY) private readonly userRepository: IUserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      _audience: process.env.AWS_COGNITO_CLIENT_ID,
      issuer: process.env.AWS_COGNITO_ISSUER,
      algorithms: ['RS256'],
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${process.env.AWS_COGNITO_ISSUER}/.well-known/jwks.json`,
      }),
    });
  }

  async validate(accessToken: AccessTokenDto) {
    return this.userRepository.getOneByUsername(accessToken.username);
  }
}
