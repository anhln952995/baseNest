import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/types';
import { createJWToken } from 'src/common/jwt.config';
import { User } from 'src/db/models/users.model';

export class UserDetailEntity {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  full_name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  token?: string;

  constructor(user: Partial<UserDetailEntity>) {
    user.token = createJWToken(user.user_id);
    Object.assign(this, user);
  }
}

export class UserDetailResponse extends ApiResponseData {
  @ApiProperty({ type: UserDetailEntity })
  data: UserDetailEntity;
}
