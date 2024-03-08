import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  IsNull,
} from 'typeorm';

import { CreateInvoiceItemDto, GetAllInvoiceItemQuery } from './dto';
import { InvoiceItem, SubCategory } from './entities';

@Injectable()
export class InvoiceItemService {
  constructor(
    @InjectRepository(InvoiceItem)
    private readonly invoiceRepository: Repository<InvoiceItem>,
    @InjectRepository(SubCategory)
    private readonly subCategoryRepository: Repository<SubCategory>,
  ) {}

  async create(dto: CreateInvoiceItemDto) {
    const subCategory = await this.subCategoryRepository.save({
      name: dto.name,
      description: dto.description,
    });

    return await this.invoiceRepository.save({
      ...dto,
      subCategoryId: subCategory.id,
    });
  }

  async getOne(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
      relations: {
        subCategory: true,
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found!.');
    }

    return invoice;
  }

  async getAllWithPagination(query: GetAllInvoiceItemQuery) {
    const currentPage = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 10;

    const whereQuery: FindOptionsWhere<InvoiceItem> = {
      deletedAt: IsNull(),
    };

    const orderQuery: FindOptionsOrder<InvoiceItem> = {
      id: 'DESC',
    };

    orderQuery[query?.sortingBy] = query?.sortingType || 'ASC';

    const [data, count] = await this.invoiceRepository.findAndCount({
      skip: (currentPage - 1) * limit || 0,
      take: limit || 10,
      order: orderQuery,
      where: whereQuery,
      relations: {
        subCategory: true,
      },
    });

    const totalPage = Math.ceil(count / limit);

    return {
      currentPage,
      totalPage,
      data: data,
    };
  }

  async update(id: number, dto: CreateInvoiceItemDto) {
    await this.getOne(id);

    return await this.invoiceRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.getOne(id);

    return await this.invoiceRepository.update(id, {
      deletedAt: new Date(Date.now()),
    });
  }
}
