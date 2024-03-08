import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceItemService } from './invoice-item.service';
import { InvoiceItemController } from './invoice-item.controller';
import { InvoiceItem, SubCategory } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceItem, SubCategory])],
  providers: [InvoiceItemService],
  controllers: [InvoiceItemController],
  exports: [InvoiceItemService],
})
export class InvoiceItemModule {}
