import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class AccessQuery {
  @ApiProperty({
    required: false,
    example: 'https://google.com/',
  })
  @IsOptional()
  @IsString()
  url?: string;
}
