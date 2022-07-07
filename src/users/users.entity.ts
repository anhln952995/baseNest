import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/types';
import { createJWToken } from 'src/common/jwt.config';
import { User } from 'src/db/models/users.model';
export class UserEntity {
  @ApiProperty()
  user_id: string;

  @ApiProperty()
  full_name?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: string;
}
export class UserDetailEntity extends UserEntity {
  @ApiProperty()
  token?: string;

  constructor(user: Partial<UserDetailEntity>) {
    super();
    user.token = createJWToken(user.user_id);
    Object.assign(this, user);
  }
}

export class UserDetailResponse extends ApiResponseData {
  @ApiProperty({ type: UserDetailEntity })
  data: UserDetailEntity;
}

export class UserInfoResponse extends ApiResponseData {
  @ApiProperty({ type: UserEntity })
  data: UserEntity;
}

export class UsersListResponse extends ApiResponseData {
  @ApiProperty({ type: [UserEntity] })
  data: UserEntity[];
  @ApiProperty()
  count: number;
}
