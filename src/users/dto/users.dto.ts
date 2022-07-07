import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsUUID,
  Min,
  Max,
  IsString,
  IsArray,
  IsEmail,
} from 'class-validator';

export class UserIdParam {
  @ApiProperty()
  @IsUUID()
  user_id: string;
}

export class LoginUserBody {
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Min(6)
  password: string;
}

export class CreateUserBody extends LoginUserBody {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  role: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  full_name: string;
}
