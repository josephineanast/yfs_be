import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseReqQuery } from 'src/query/base.query';

export class GetAllInvoiceItemQuery extends BaseReqQuery {
  @ApiProperty({
    required: false,
    example: 'createdAt',
    enum: ['createdAt', 'id'],
  })
  @IsOptional()
  @IsString()
  sortingBy?: 'createdAt' | 'id';
}
