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
  Patch,
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
import { NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDetailResponse } from './users.entity';
import { UserIdParam, CreateUserBody, LoginUserBody } from './dto/users.dto';
import { ApiResponseData } from 'src/common/types';
import { User } from '../db/models/users.model';
import { ROLE_ARRAY } from 'src/common/constant';

// import { PrivateRoute } from 'src/common/PrivateRoute';

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

  @ApiOperation({ operationId: 'create-user' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiSecurity('AccessToken')
  @UseGuards(AuthGuard('headerapikey'))
  @Post('/create')
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  async createUser(
    @Request() req,
    @Body() body: CreateUserBody,
  ): Promise<ApiResponseData> {
    const { email, password, role, full_name: fullName } = body;
    if (!ROLE_ARRAY.includes(role)) {
      throw new NotFoundException('Not found this role');
    }

    const responseData = await this.usersService.createUser({
      email,
      password,
      role,
      fullName,
    });
    return new ApiResponseData(HttpStatus.OK, responseData);
  }

  @ApiOperation({ operationId: 'login-user' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Patch('/login')
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  async loggin(
    @Request() req,
    @Body() body: LoginUserBody,
  ): Promise<ApiResponseData> {
    const { email, password } = body;
    const responseData = await this.usersService.login({
      email,
      password,
    });
    return new ApiResponseData(HttpStatus.OK, responseData);
  }
}
