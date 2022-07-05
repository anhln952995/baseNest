/* eslint-disable @typescript-eslint/ban-types */
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiSecurity,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiUnauthorizedResponse,
  ApiInternalServerErrorResponse,
  ApiConflictResponse,
} from '@nestjs/swagger';

export function PrivateRoute() {
  return (target: Function) => {
    console.log('dsaadsas');
    ApiSecurity('X-API-KEY')(target);
    UseGuards(AuthGuard('headerapikey'))(target);
    ApiUnauthorizedResponse({ description: 'Không được phép truy cập' })(
      target,
    );
    ApiForbiddenResponse({ description: 'Chưa được cấp quyền truy cập' })(
      target,
    );
    ApiBadRequestResponse({ description: 'Dữ liệu gửi lên có vấn đề' })(target);
    ApiNotFoundResponse({ description: 'Không tìm thấy dữ liệu' })(target);
    ApiInternalServerErrorResponse({ description: 'Có lỗi nội bộ server' })(
      target,
    );
    ApiConflictResponse({ description: 'Dữ liệu xung đột' })(target);
  };
}
