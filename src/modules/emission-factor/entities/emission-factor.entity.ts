import { Basic } from 'src/entities/basic.entity';
import { Column, Entity } from 'typeorm';
import {
  EmissionFactorSubTypeEnum,
  EmissionFactorCategoryEnum,
} from '../enums';

@Entity('emission_factors')
export class EmissionFactor extends Basic {
  @Column({ type: 'varchar', name: 'danish_name', unique: true })
  danishName: string;

  @Column({ type: 'varchar', name: 'english_name', unique: true })
  englishName: string;

  @Column({ type: 'varchar' })
  country: string;

  @Column({ type: 'varchar' })
  unit: string;

  @Column({ type: 'numeric', name: 'scope_one' })
  scopeOne: number;

  @Column({ type: 'numeric', name: 'scope_two' })
  scopeTwo: number;

  @Column({ type: 'numeric', name: 'scope_three' })
  scopeThree: number;

  @Column({ type: 'numeric', name: 'outside_scope' })
  outsideScope: number;

  @Column({ type: 'text', name: 'allocated_scope' })
  allocatedScope: string;

  @Column({ type: 'text', name: 'source_year' })
  sourceYear: string;

  @Column({
    type: 'enum',
    enum: EmissionFactorCategoryEnum,
  })
  category: EmissionFactorCategoryEnum;

  @Column({
    type: 'enum',
    enum: EmissionFactorSubTypeEnum,
    name: 'sub_type',
    nullable: true,
  })
  subType: EmissionFactorSubTypeEnum;

  @Column({ type: 'text', name: 'company_name', nullable: true })
  companyName: string;

  @Column({ type: 'text', name: 'sub_category_name', nullable: true })
  subCategoryName: string;
}
