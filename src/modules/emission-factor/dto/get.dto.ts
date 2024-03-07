import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseReqQuery } from 'src/query/base.query';
import { EmissionFactorCategoryEnum } from '../enums';

export class GetAllEmissionFactorQuery extends BaseReqQuery {
  @ApiProperty({
    required: false,
    example: 'createdAt',
    enum: ['createdAt', 'type'],
  })
  @IsOptional()
  @IsString()
  sortingBy?: 'createdAt' | 'type';

  @ApiProperty({
    required: false,
    example: 1,
    enum: [1, 2],
  })
  @IsOptional()
  @IsString()
  category?: 1 | 2;
}

export class GetAllEmissionDropdownQuery {
  @ApiProperty({
    required: false,
    example: 1,
    enum: [1, 2],
  })
  @IsOptional()
  @IsString()
  category?: 1 | 2;
}
