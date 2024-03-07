import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  Repository,
  IsNull,
} from 'typeorm';

import { EnvironmentalImpact } from './entities';
import {
  CreateEnvironmentalImpactDto,
  GetAllEnvironmentalImpactQuery,
} from './dto';

@Injectable()
export class EnvironmentalImpactService {
  constructor(
    @InjectRepository(EnvironmentalImpact)
    private readonly environmentalImpactRepository: Repository<EnvironmentalImpact>,
  ) {}

  async create(dto: CreateEnvironmentalImpactDto) {
    return await this.environmentalImpactRepository.save({
      ...dto,
    });
  }

  async getOne(id: number) {
    const emissionFactor = await this.environmentalImpactRepository.findOne({
      where: {
        id,
        deletedAt: IsNull(),
      },
    });

    if (!emissionFactor) {
      throw new NotFoundException('Emission Factor not found!.');
    }

    return emissionFactor;
  }

  async getAllWithPagination(query: GetAllEnvironmentalImpactQuery) {
    const currentPage = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 10;

    const whereQuery: FindOptionsWhere<EnvironmentalImpact> = {
      deletedAt: IsNull(),
    };

    const orderQuery: FindOptionsOrder<EnvironmentalImpact> = {
      id: 'DESC',
    };

    orderQuery[query?.sortingBy] = query?.sortingType || 'ASC';

    const [data, count] = await this.environmentalImpactRepository.findAndCount(
      {
        skip: (currentPage - 1) * limit || 0,
        take: limit || 10,
        order: orderQuery,
        where: whereQuery,
      },
    );

    const totalPage = Math.ceil(count / limit);

    return {
      currentPage,
      totalPage,
      data: data,
    };
  }

  async update(id: number, dto: CreateEnvironmentalImpactDto) {
    await this.getOne(id);

    return await this.environmentalImpactRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.getOne(id);

    return await this.environmentalImpactRepository.update(id, {
      deletedAt: new Date(Date.now()),
    });
  }
}
