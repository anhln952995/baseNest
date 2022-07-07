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
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { NotFoundException } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDetailResponse, UsersListResponse } from './users.entity';
import {
  UserIdParam,
  CreateUserBody,
  LoginUserBody,
  ListUserParam,
  ActiveUserBody,
  EmailUserParam,
} from './dto/users.dto';
import { ROLE_ARRAY, ACTION, SUBJECT } from 'src/common/constant';
import { ApiResponseData } from 'src/common/types';
import { ability } from 'src/common/ability';

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
    const {
      user_id: userId,
      role,
      organization_id: organizationId,
    } = req.authInfo;
    // await ability({
    //   role,
    //   organizationId,
    //   userId,
    //   action: ACTION.LIST,
    //   subject: SUBJECT.USER,
    // });

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
    const {
      user_id: userId,
      role,
      organization_id: organizationId,
    } = req.authInfo;
    await ability({
      role,
      organizationId,
      userId,
      action: ACTION.READ,
      subject: SUBJECT.USER,
    });
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
    const { email, role } = body;
    const {
      user_id: userId,
      role: myRole,
      organization_id: organizationId,
    } = req.authInfo;
    await ability({
      role: myRole,
      organizationId,
      userId,
      action: ACTION.CREATE,
      subject: SUBJECT.USER,
    });
    if (!ROLE_ARRAY.includes(role)) {
      throw new NotFoundException('Not found this role');
    }
    const responseData = await this.usersService.createUser({
      email,
      role,
      createdBy: userId,
      organizationId,
    });
    return new ApiResponseData(HttpStatus.OK, responseData);
  }

  @ApiOperation({ operationId: 'active-user' })
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/active/:email')
  @ApiOkResponse({
    type: UserDetailResponse,
  })
  async activeUser(
    @Request() req,
    @Body() body: ActiveUserBody,
    @Param() params: EmailUserParam,
  ): Promise<ApiResponseData> {
    const { email } = params;
    const { full_name: fullName, password } = body;

    const responseData = await this.usersService.ActiveUser({
      email,
      fullName,
      password,
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
