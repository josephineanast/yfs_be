import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  EmissionFactorSubTypeEnum,
  EmissionFactorCategoryEnum,
} from '../enums';

export class CreateEmissionFactorDto {
  @ApiProperty({ example: 'Ædelmetaller (kg)' })
  @IsString()
  @IsNotEmpty()
  danishName: string;

  @ApiProperty({ example: 'Precious metal (kg)' })
  @IsString()
  @IsNotEmpty()
  englishName: string;

  @ApiProperty({ example: 'DK' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'kg' })
  @IsString()
  @IsNotEmpty()
  unit: string;

  @ApiProperty({ example: 0.0 })
  @IsNotEmpty()
  @IsNumber()
  scopeOne: number;

  @ApiProperty({ example: 0.0 })
  @IsNotEmpty()
  @IsNumber()
  scopeTwo: number;

  @ApiProperty({ example: 0.0 })
  @IsNotEmpty()
  @IsNumber()
  scopeThree: number;

  @ApiProperty({ example: 0.0 })
  @IsNotEmpty()
  @IsNumber()
  outsideScope: number;

  @ApiProperty({ example: 'S3-C1/2' })
  @IsNotEmpty()
  @IsNumber()
  allocatedScope: string;

  @ApiProperty({ example: 'EXIOBASE v3.3.16b2 (v. 2020 m. 2011-data)' })
  @IsString()
  @IsNotEmpty()
  sourceYear: string;

  @ApiProperty({
    example: EmissionFactorCategoryEnum.One,
    enum: EmissionFactorCategoryEnum,
  })
  @IsEnum(EmissionFactorCategoryEnum)
  @IsNotEmpty()
  category: EmissionFactorCategoryEnum;

  @ApiProperty({
    example: EmissionFactorSubTypeEnum.Food,
    enum: EmissionFactorSubTypeEnum,
    required: false,
  })
  @IsEnum(EmissionFactorSubTypeEnum)
  @IsOptional()
  subType: EmissionFactorSubTypeEnum;
}
