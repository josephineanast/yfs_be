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
import { CreateInvoiceItemDto, GetAllInvoiceItemQuery } from './dto';
import { InvoiceItemService } from './invoice-item.service';

@Controller({ path: 'invoice-item', version: ApiVersion.V1 })
@ApiController({ tag: `Invoice Item`, version: ApiVersion.V1 })
export class InvoiceItemController {
  constructor(
    private readonly invoiceService: InvoiceItemService,
    private readonly responseService: ResponseService,
  ) {}

  @Get()
  @ApiOperation({
    description: `Feature: Get all Invoice Item with pagination`,
  })
  @ApiProperty({
    description: `Get all Invoice with pagination`,
    type: GetAllInvoiceItemQuery,
  })
  @ApiResponse({ status: 200 })
  async getAll(@Query() query: GetAllInvoiceItemQuery) {
    try {
      const { currentPage, totalPage, data } =
        await this.invoiceService.getAllWithPagination(query);
      const msg =
        data.length > 0
          ? `Get all Invoice Item success!`
          : `No Invoice Item data found`;

      return this.responseService.paging(msg, totalPage, currentPage, data);
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Post()
  @ApiProperty({ description: 'Create an Invoice Item' })
  @ApiResponse({ status: 200 })
  async create(@Body() dto: CreateInvoiceItemDto) {
    try {
      await this.invoiceService.create(dto);

      return this.responseService.success('Create Invoice Item success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Get(':id')
  @ApiProperty({ description: 'Get one Invoice Item' })
  @ApiResponse({ status: 200 })
  async getOne(@Param('id') id: number) {
    try {
      const data = await this.invoiceService.getOne(id);

      return this.responseService.success(
        'Get one Invoice Item success!',
        data,
      );
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Patch(':id')
  @ApiProperty({ description: 'Update Invoice Item' })
  @ApiResponse({ status: 200 })
  async update(@Param('id') id: number, @Body() dto: CreateInvoiceItemDto) {
    try {
      await this.invoiceService.update(id, dto);

      return this.responseService.success('Update Invoice Item success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }

  @Delete(':id')
  @ApiProperty({ description: 'Delete Invoice Item' })
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: number) {
    try {
      await this.invoiceService.delete(id);

      return this.responseService.success('Delete Invoice Item success!');
    } catch (error) {
      return this.responseService.error(error);
    }
  }
}
