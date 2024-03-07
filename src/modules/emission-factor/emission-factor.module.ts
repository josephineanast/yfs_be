import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmissionFactor } from './entities';
import { EmissionFactorService } from './emission-factor.service';
import { EmissionFactorController } from './emission-factor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EmissionFactor])],
  providers: [EmissionFactorService],
  controllers: [EmissionFactorController],
  exports: [EmissionFactorService],
})
export class EmissionFactorModule {}
