import { Basic } from 'src/entities/basic.entity';
import { EmissionFactor } from 'src/modules/emission-factor/entities';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('invoices')
export class Invoice extends Basic {
  @Column({ type: 'varchar', name: 'building_name' })
  buildingName: string;

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
  footprint: number;

  @Column({ type: 'varchar', name: 'building_codes' })
  buildingCodes: string;

  // materialProduct: string;
  @Column({ name: 'emission_factor_id' })
  emissionFactorId: number;

  @ManyToOne(() => EmissionFactor, (emissionFactor) => emissionFactor.invoices)
  @JoinColumn({ name: 'emission_factor_id' })
  EmissionFactor: EmissionFactor;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ type: 'int' })
  weight: number;

  @Column({ type: 'float', name: 'price_on_invoice' })
  priceOnInvoice: number;

  @Column({ type: 'int', name: 'tonnes_co2e' })
  tonnesCo2e: number;
}
