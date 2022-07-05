import {
  Controller,
  Get,
  Post,
  Query,
  Param,
  Request,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiTags,
  ApiOkResponse,
  ApiSecurity,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

import { UsersService } from './users.service';
import { UserDetailResponse } from './users.entity';
import { UserIdParam } from './dto/users.dto';
import { ApiResponseData } from 'src/common/types';
import { PrivateRoute } from 'src/common/PrivateRoute';

@ApiTags('User')
@Controller('user')
// @PrivateRoute()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ operationId: 'get-user' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiSecurity('AccessToken')
  @UseGuards(AuthGuard('headerapikey'))
  @Get()
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  async getExpenseReports(
    @Request() req,
    @Query() params: UserIdParam,
  ): Promise<ApiResponseData> {
    const { user_id: userId } = params;
    const apiKey = req.authInfo;

    return new ApiResponseData(HttpStatus.OK, {
      user_id: userId,
      name: apiKey,
    });
  }
}
