import { HttpStatus, ConflictException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
export class ApiResponseData {
  @ApiProperty({ description: 'HTTP status code' })
  statusCode: number;
  @ApiProperty()
  data?: unknown;
  total?: number | null;

  constructor(statusCode: HttpStatus, data: unknown, total?: number | null) {
    this.statusCode = statusCode;
    this.data = data;
    this.total = total;
  }
}

export class PaginationResponse extends ApiResponseData {
  @ApiProperty()
  total: number;
  @ApiProperty({
    type: 'object',
    properties: {
      next: {
        type: 'string',
      },
      prev: {
        type: 'string',
      },
      first: {
        type: 'string',
      },
      last: {
        type: 'string',
      },
    },
  })
  pagination: {
    next: string;
    prev: string;
    first: string;
    last: string;
  };
}

export class DuplicatedResourceException extends ConflictException {
  constructor(message = 'Duplicated resource!', data?: Record<string, any>) {
    super({ statusCode: 409, errorCode: 'RESOURCE_EXISTS', message, data });
  }
}
