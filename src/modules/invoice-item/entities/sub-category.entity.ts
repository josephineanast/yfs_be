import { Basic } from 'src/entities/basic.entity';
import { Column, Entity, OneToOne } from 'typeorm';
import { InvoiceItem } from './invoice-item.entity';

@Entity('sub_categories')
export class SubCategory extends Basic {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @OneToOne(() => InvoiceItem, (invoiceItem) => invoiceItem.subCategory)
  invoiceItem: InvoiceItem;
}
