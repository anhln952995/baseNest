import { ApiProperty } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/types';

export class UserDetailEntity {
  @ApiProperty()
  user_id: string;
  @ApiProperty()
  name: string;
}

export class UserDetailResponse extends ApiResponseData {
  @ApiProperty({ type: UserDetailEntity })
  data: UserDetailEntity;
}
