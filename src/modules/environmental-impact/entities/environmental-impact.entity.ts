import { Basic } from 'src/entities/basic.entity';
import { Column, Entity } from 'typeorm';

@Entity('environmental_impacts')
export class EnvironmentalImpact extends Basic {
  @Column({ type: 'float', name: 'emissions_estimate' })
  emissionsEstimate: number;

  @Column({ type: 'float', name: 'energy_use_estimate' })
  energyUseEstimate: number;

  @Column({ type: 'float', name: 'water_usage_estimate' })
  waterUsageEstimate: number;

  @Column({ type: 'float', name: 'scope_one' })
  scopeOne: number;

  @Column({ type: 'float', name: 'scope_two' })
  scopeTwo: number;

  @Column({ type: 'float', name: 'scope_three' })
  scopeThree: number;
}
