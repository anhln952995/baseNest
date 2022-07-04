import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsUUID,
  Min,
  Max,
  IsString,
  IsArray,
} from 'class-validator';

export class UserIdParam {
  @ApiProperty()
  @IsUUID()
  user_id: string;
}
