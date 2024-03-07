import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  FindOptionsOrder,
  FindOptionsWhere,
  ILike,
  Repository,
  IsNull,
} from 'typeorm';
import { EmissionFactor } from './entities';
import {
  CreateEmissionFactorDto,
  GetAllEmissionDropdownQuery,
  GetAllEmissionFactorQuery,
} from './dto';

@Injectable()
export class EmissionFactorService {
  constructor(
    @InjectRepository(EmissionFactor)
    private readonly emissionFactorRepository: Repository<EmissionFactor>,
  ) {}

  async create(dto: CreateEmissionFactorDto) {
    return await this.emissionFactorRepository.save({
      ...dto,
      category: Number(dto.category),
    });
  }

  async getOne(id: number) {
    const emissionFactor = await this.emissionFactorRepository.findOne({
      where: {
        id,
        deletedAt: null,
      },
    });

    if (!emissionFactor) {
      throw new NotFoundException('Emission Factor not found!.');
    }

    return emissionFactor;
  }

  async getAllWithPagination(query: GetAllEmissionFactorQuery) {
    const currentPage = query.page ? parseInt(query.page.toString(), 10) : 1;
    const limit = query.limit ? parseInt(query.limit.toString(), 10) : 10;

    console.log('A', query?.category);
    const whereQuery: FindOptionsWhere<EmissionFactor> = {
      deletedAt: null,
      category: query?.category,
    };

    if (query?.keyword) {
      const ilikeQuery = ILike(`%${query.keyword}%`);
      whereQuery['danishName'] = ilikeQuery;
    }

    const orderQuery: FindOptionsOrder<EmissionFactor> = {
      danishName: query?.sortingType,
    };

    orderQuery[query?.sortingBy] = query?.sortingType || 'ASC';

    const [data, count] = await this.emissionFactorRepository.findAndCount({
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

  async update(id: number, dto: CreateEmissionFactorDto) {
    await this.getOne(id);

    return await this.emissionFactorRepository.update(id, dto);
  }

  async delete(id: number) {
    await this.getOne(id);

    return await this.emissionFactorRepository.update(id, {
      deletedAt: new Date(Date.now()),
    });
  }

  async getDropdown(query?: GetAllEmissionDropdownQuery) {
    const emissionFactor = await this.emissionFactorRepository.find({
      select: {
        id: true,
        danishName: true,
        englishName: true,
        category: true,
        subType: true,
      },
      where: {
        deletedAt: IsNull(),
        category: query?.category,
      },
      order: {
        // danishName: 'ASC',
        englishName: 'ASC',
      },
    });

    if (!emissionFactor) {
      throw new NotFoundException('Emission Factor not found!.');
    }

    return emissionFactor;
  }
}
