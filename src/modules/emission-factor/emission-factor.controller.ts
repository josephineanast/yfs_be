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
import { EmissionFactorService } from './emission-factor.service';
import {
  CreateEmissionFactorDto,
  GetAllEmissionDropdownQuery,
  GetAllEmissionFactorQuery,
} from './dto';

@Controller({ path: 'emission-factor', version: ApiVersion.V1 })
@ApiController({ tag: `Emission Factor`, version: ApiVersion.V1 })
export class EmissionFactorController {
  constructor(
    private readonly emissionFactorService: EmissionFactorService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiOperation({
    description: `Feature: Get all Emission Factor's with pagination`,
  })
  @ApiProperty({
    description: `Get all Emission Factor's with pagination`,
    type: GetAllEmissionFactorQuery,
  })
  @ApiResponse({ status: 200 })
  async getAll(@Query() query: GetAllEmissionFactorQuery) {
    try {
      const { currentPage, totalPage, data } =
        await this.emissionFactorService.getAllWithPagination(query);
      const msg =
        data.length > 0
          ? `Get all Emission Factor's success!`
          : `No Emission Factor data found`;

      return this.responseService.paging(msg, totalPage, currentPage, data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Post()
  @ApiProperty({ description: 'Create a Emission Factor' })
  @ApiResponse({ status: 200 })
  async create(@Body() dto: CreateEmissionFactorDto) {
    try {
      await this.emissionFactorService.create(dto);

      return this.responseService.success('Create Emission Factor success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  @ApiProperty({ description: 'Get one Emission Factor' })
  @ApiResponse({ status: 200 })
  async getOne(@Param('id') id: number) {
    try {
      const data = await this.emissionFactorService.getOne(id);

      return this.responseService.success(
        'Get one Emission Factor success!',
        data,
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  @ApiProperty({ description: 'Update Emission Factor' })
  @ApiResponse({ status: 200 })
  async update(@Param('id') id: number, @Body() dto: CreateEmissionFactorDto) {
    try {
      await this.emissionFactorService.update(id, dto);

      return this.responseService.success('Update Emission Factor success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  @ApiProperty({ description: 'Delete Emission Factor' })
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: number) {
    try {
      await this.emissionFactorService.delete(id);

      return this.responseService.success('Delete Emission Factor success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get('/as/dropdown')
  @ApiProperty({ description: 'Get dropdown Emission Factor' })
  @ApiResponse({ status: 200 })
  async getDropdown(@Query() query?: GetAllEmissionDropdownQuery) {
    try {
      const getDropdown = await this.emissionFactorService.getDropdown(query);

      return this.responseService.success(
        'Get Emission Factor as dropdown success!',
        getDropdown,
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
