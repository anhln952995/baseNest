import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  async validateUser(apiKey: string): Promise<any> {
    return apiKey;
  }
}
