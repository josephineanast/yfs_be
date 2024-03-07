import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateEnvironmentalImpactDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  emissionsEstimate: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  energyUseEstimate: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  waterUsageEstimate: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  scopeOne: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  scopeTwo: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  scopeThree: number;
}
