import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { SortingType } from 'src/enums';

export class BaseReqQuery {
  @ApiProperty({
    required: false,
    enum: SortingType,
    example: SortingType.Asce,
  })
  @IsOptional()
  @IsString()
  sortingType?: SortingType;

  @ApiProperty({
    required: false,
    example: 1,
    default: 1,
  })
  @IsOptional()
  @IsNumberString()
  page?: number;

  @ApiProperty({
    required: false,
    example: 10,
    default: 10,
  })
  @IsOptional()
  @IsNumberString()
  limit?: number;

  @ApiProperty({
    required: false,
    example: 'Ædelmetaller',
  })
  @IsOptional()
  @IsString()
  @Type(() => String)
  keyword?: string;
}
