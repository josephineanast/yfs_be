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
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto, GetAllInvoiceQuery } from './dto';

@Controller({ path: 'invoice', version: ApiVersion.V1 })
@ApiController({ tag: `Invoice`, version: ApiVersion.V1 })
export class InvoiceController {
  constructor(
    private readonly invoiceService: InvoiceService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiOperation({
    description: `Feature: Get all Invoice with pagination`,
  })
  @ApiProperty({
    description: `Get all Invoice with pagination`,
    type: GetAllInvoiceQuery,
  })
  @ApiResponse({ status: 200 })
  async getAll(@Query() query: GetAllInvoiceQuery) {
    try {
      const { currentPage, totalPage, data } =
        await this.invoiceService.getAllWithPagination(query);
      const msg =
        data.length > 0 ? `Get all Invoice success!` : `No Invoice data found`;

      return this.responseService.paging(msg, totalPage, currentPage, data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Post()
  @ApiProperty({ description: 'Create an Invoice' })
  @ApiResponse({ status: 200 })
  async create(@Body() dto: CreateInvoiceDto) {
    try {
      await this.invoiceService.create(dto);

      return this.responseService.success('Create Invoice success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  @ApiProperty({ description: 'Get one Invoice' })
  @ApiResponse({ status: 200 })
  async getOne(@Param('id') id: number) {
    try {
      const data = await this.invoiceService.getOne(id);

      return this.responseService.success('Get one Invoice success!', data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  @ApiProperty({ description: 'Update Invoice' })
  @ApiResponse({ status: 200 })
  async update(@Param('id') id: number, @Body() dto: CreateInvoiceDto) {
    try {
      await this.invoiceService.update(id, dto);

      return this.responseService.success('Update Invoice success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  @ApiProperty({ description: 'Delete Invoice' })
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: number) {
    try {
      await this.invoiceService.delete(id);

      return this.responseService.success('Delete Invoice success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
