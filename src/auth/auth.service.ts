import { Injectable } from '@nestjs/common';

import { verifyJWTToken } from 'src/common/jwt.config';
import { User } from '../db/models/users.model';
@Injectable()
export class AuthService {
  async validateUser(apiKey: string): Promise<any> {
    const decodedToken = await verifyJWTToken(apiKey);
    return User.findOne({
      attributes: ['user_id', 'role'],
      where: { user_id: decodedToken, deleted_at: null },
    });
  }
}
