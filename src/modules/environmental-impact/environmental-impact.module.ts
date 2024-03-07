import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnvironmentalImpactService } from './environmental-impact.service';
import { EnvironmentalImpactController } from './environmental-impact.controller';
import { EnvironmentalImpact } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([EnvironmentalImpact])],
  providers: [EnvironmentalImpactService],
  controllers: [EnvironmentalImpactController],
  exports: [EnvironmentalImpactService],
})
export class EnvironmentalImpactModule {}
