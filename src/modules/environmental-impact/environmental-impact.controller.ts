import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse } from '@nestjs/swagger';
import { ApiController } from 'src/decorators';
import { ApiVersion } from 'src/enums';
import { ResponseService } from 'src/response/response.service';
import { EnvironmentalImpactService } from './environmental-impact.service';
import {
  CreateEnvironmentalImpactDto,
  GetAllEnvironmentalImpactQuery,
} from './dto';

@Controller({ path: 'environmental-impact', version: ApiVersion.V1 })
@ApiController({ tag: `Environmental Impact`, version: ApiVersion.V1 })
export class EnvironmentalImpactController {
  constructor(
    private readonly environmentalImpactService: EnvironmentalImpactService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiOperation({
    description: `Feature: Get all Environmental Impact's with pagination`,
  })
  @ApiProperty({
    description: `Get all Environmental Impact's with pagination`,
    type: GetAllEnvironmentalImpactQuery,
  })
  @ApiResponse({ status: 200 })
  async getAll(@Query() query: GetAllEnvironmentalImpactQuery) {
    try {
      const { currentPage, totalPage, data } =
        await this.environmentalImpactService.getAllWithPagination(query);
      const msg =
        data.length > 0
          ? `Get all Environmental Impact's success!`
          : `No Environmental Impact data found`;

      return this.responseService.paging(msg, totalPage, currentPage, data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Post()
  @ApiProperty({ description: 'Create a Environmental Impact' })
  @ApiResponse({ status: 200 })
  async create(@Body() dto: CreateEnvironmentalImpactDto) {
    try {
      await this.environmentalImpactService.create(dto);

      return this.responseService.success(
        'Create Environmental Impact success!',
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  @ApiProperty({ description: 'Get one Environmental Impact' })
  @ApiResponse({ status: 200 })
  async getOne(@Param('id') id: number) {
    try {
      const data = await this.environmentalImpactService.getOne(id);

      return this.responseService.success(
        'Get one Environmental Impact success!',
        data,
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  @ApiProperty({ description: 'Update Environmental Impact' })
  @ApiResponse({ status: 200 })
  async update(
    @Param('id') id: number,
    @Body() dto: CreateEnvironmentalImpactDto,
  ) {
    try {
      await this.environmentalImpactService.update(id, dto);

      return this.responseService.success(
        'Update Environmental Impact success!',
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  @ApiProperty({ description: 'Delete Environmental Impact' })
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: number) {
    try {
      await this.environmentalImpactService.delete(id);

      return this.responseService.success(
        'Delete Environmental Impact success!',
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
