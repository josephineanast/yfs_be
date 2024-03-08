import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './utils';
import { typeOrmAsyncConfig } from './database/typeorm-config';
import { ResponseModule } from './response/response.module';
import { EmissionFactorModule } from './modules/emission-factor/emission-factor.module';
import { EnvironmentalImpactModule } from './modules/environmental-impact/environmental-impact.module';
import { ExternalApiModule } from './modules/external-api/external-api.module';
import { InvoiceModule } from './modules/invoice/invoice.module';
import { InvoiceItemModule } from './modules/invoice-item/invoice-item.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ResponseModule,
    EmissionFactorModule,
    EnvironmentalImpactModule,
    ExternalApiModule,
    InvoiceModule,
    InvoiceItemModule,
  ],
  controllers: [AppController],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
