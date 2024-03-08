import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateInvoiceItemDto {
  @ApiProperty({ example: 'Name of sub category' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'Desc. of sub category' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: 'Hercules Building' })
  @IsString()
  @IsNotEmpty()
  buildingName: string;

  @ApiProperty({ example: '2023-12-13T08:30:00Z' })
  @IsDateString()
  @IsNotEmpty()
  invoiceDate: Date;

  @ApiProperty({ example: 'INV1234' })
  @IsString()
  @IsNotEmpty()
  invoiceNo: string;

  @ApiProperty({ example: 'Josephine' })
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'manuel must be greater than 0' })
  manuel: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'emissionFactorId must be greater than 0' })
  emissionFactorId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'amount must be greater than 0' })
  amount: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'weight must be greater than 0' })
  weight: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'lifeExpectency must be greater than 0' })
  lifeExpectency: number;

  @ApiProperty({ example: 100 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'priceOnInvoice must be greater than 0' })
  priceOnInvoice: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @IsNotEmpty()
  @Min(1, { message: 'tonnesCo2e must be greater than 0' })
  tonnesCo2e: number;
}
