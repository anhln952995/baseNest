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
import { Type, Expose } from 'class-transformer';

export class UserIdParam {
  @ApiProperty()
  @IsUUID()
  user_id: string;
}

export class EmailUserParam {
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;
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

export class CreateUserBody {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  role: string;

  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email: string;
}

export class ActiveUserBody {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  @Min(6)
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  full_name: string;
}

export class ListUserParam {
  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  search?: string;

  @ApiPropertyOptional({
    default: 1,
  })
  @Type(() => Number)
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    default: 20,
  })
  @Type(() => Number)
  @Min(1)
  @Max(100)
  size?: number = 20;

  @Expose()
  get limit(): number {
    return Math.min(+this.size, 100);
  }

  @Expose()
  get offset(): number {
    return this.limit * (this.page - 1);
  }
}
