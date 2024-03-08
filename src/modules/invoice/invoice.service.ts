import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  IsNull,
} from 'typeorm';

import { Invoice } from './entities';
import { CreateInvoiceDto, GetAllInvoiceQuery } from './dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async create(dto: CreateInvoiceDto) {
    if (dto.quantity > 1) {
      dto.weight * dto.quantity;
    }
    return await this.invoiceRepository.save({
      ...dto,
    });
  }

  async getOne(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found!.');
    }

    return invoice;
  }

  async getAllWithPagination(query: GetAllInvoiceQuery) {
    const currentPage = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 10;

    const whereQuery: FindOptionsWhere<Invoice> = {
      deletedAt: IsNull(),
    };

    const orderQuery: FindOptionsOrder<Invoice> = {
      id: 'DESC',
    };

    orderQuery[query?.sortingBy] = query?.sortingType || 'ASC';

    const [data, count] = await this.invoiceRepository.findAndCount({
      skip: (currentPage - 1) * limit || 0,
      take: limit || 10,
      order: orderQuery,
      where: whereQuery,
    });

    const totalPage = Math.ceil(count / limit);

    return {
      currentPage,
      totalPage,
      data: data,
    };
  }

  async update(id: number, dto: CreateInvoiceDto) {
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
