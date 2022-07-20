import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MailService } from 'src/mail/mail.service';

@Module({
  providers: [UsersService, MailService],
  controllers: [UsersController],
})
export class UsersModule {}
