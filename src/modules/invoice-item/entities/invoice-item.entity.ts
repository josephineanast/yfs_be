import { Basic } from 'src/entities/basic.entity';
import { EmissionFactor } from 'src/modules/emission-factor/entities';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import { SubCategory } from '.';

@Entity('invoice_items')
export class InvoiceItem extends Basic {
  @Column({ name: 'sub_category_id' })
  subCategoryId: number;

  @OneToOne(() => SubCategory, (subCategory) => subCategory.invoiceItem)
  @JoinColumn({ name: 'sub_category_id' })
  subCategory: SubCategory;

  @Column({
    name: 'receive_date_and_time',
    type: 'timestamp',
  })
  invoiceDate: Date;

  @Column({ type: 'varchar', name: 'invoice_no' })
  invoiceNo: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'int' })
  manuel: number;

  // materialProduct: string;
  @Column({ name: 'emission_factor_id' })
  emissionFactorId: number;

  @ManyToOne(
    () => EmissionFactor,
    (emissionFactor) => emissionFactor.invoiceItems,
  )
  @JoinColumn({ name: 'emission_factor_id' })
  EmissionFactor: EmissionFactor;

  @Column({ type: 'int' })
  amount: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'int', name: 'life_expectency' })
  lifeExpectency: number;

  @Column({ type: 'float', name: 'price_on_invoice' })
  priceOnInvoice: number;

  @Column({ type: 'int', name: 'tonnes_co2e' })
  tonnesCo2e: number;
}
