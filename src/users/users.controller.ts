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
import {
  UserDetailResponse,
  UsersListResponse,
  UserInfoResponse,
} from './users.entity';
import {
  UserIdParam,
  CreateUserBody,
  LoginUserBody,
  ListUserParam,
} from './dto/users.dto';
import { User } from '../db/models/users.model';
import { ROLE_ARRAY } from 'src/common/constant';
import { ApiResponseData } from 'src/common/types';

// import { PrivateRoute } from 'src/common/PrivateRoute';

@ApiTags('User')
@Controller('user')
// @PrivateRoute()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ operationId: 'get-list-user' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiSecurity('AccessToken')
  @UseGuards(AuthGuard('headerapikey'))
  @Get()
  @ApiOkResponse({
    type: UsersListResponse,
  })
  async getListUsers(
    @Request() req,
    @Query() params: ListUserParam,
  ): Promise<ApiResponseData> {
    const { limit, offset, search } = params;
    const { user_id: userId } = req.authInfo;

    const { data, count } = await this.usersService.listUsers({
      search,
      limit,
      offset,
      createdBy: userId,
    });

    return new ApiResponseData(HttpStatus.OK, data, count);
  }

  @ApiOperation({ operationId: 'get-user-info' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiSecurity('AccessToken')
  @UseGuards(AuthGuard('headerapikey'))
  @Get('/info')
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  async getUserInfo(@Request() req): Promise<ApiResponseData> {
    const { user_id: userId } = req.authInfo;
    const responseData = await this.usersService.userDetails(userId);
    return new ApiResponseData(HttpStatus.OK, responseData);
  }

  @ApiOperation({ operationId: 'get-user-by-id' })
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiSecurity('AccessToken')
  @UseGuards(AuthGuard('headerapikey'))
  @Get('/:user_id')
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  async getUserDetails(@Param() params: UserIdParam): Promise<ApiResponseData> {
    const responseData = await this.usersService.userDetails(params.user_id);
    return new ApiResponseData(HttpStatus.OK, responseData);
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
    const { user_id: userId } = req.authInfo;
    if (!ROLE_ARRAY.includes(role)) {
      throw new NotFoundException('Not found this role');
    }
    const responseData = await this.usersService.createUser({
      email,
      password,
      role,
      fullName,
      createdBy: userId,
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
