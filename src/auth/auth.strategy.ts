import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

import { AuthService } from './auth.service';

@Injectable()
export class AuthStrategy extends PassportStrategy(HeaderAPIKeyStrategy) {
  constructor(private readonly authService: AuthService) {
    super(
      { header: 'X-API-KEY', prefix: '' },
      false,
      async (apiKey: string, done: any) => {
        const authInfo = await this.authService.validateUser(apiKey);
        if (!authInfo) {
          return done(new UnauthorizedException(), false);
        }
        // error, req.user, req.authInfo
        return done(null, authInfo, authInfo);
      },
    );
  }
}
