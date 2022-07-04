import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'headerapikey',
      property: 'user',
      session: false,
    }),
  ],
  providers: [AuthService, AuthStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
