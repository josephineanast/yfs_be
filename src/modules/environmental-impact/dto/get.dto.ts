import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';
import { BaseReqQuery } from 'src/query/base.query';

export class GetAllEnvironmentalImpactQuery extends BaseReqQuery {
  @ApiProperty({
    required: false,
    example: 'createdAt',
    enum: ['createdAt', 'id'],
  })
  @IsOptional()
  @IsString()
  sortingBy?: 'createdAt' | 'id';
}

// export class GetAllEmissionDropdownQuery {
//   @ApiProperty({
//     required: false,
//     example: 1,
//     enum: [1, 2],
//   })
//   @IsOptional()
//   @IsString()
//   category?: 1 | 2;
// }
