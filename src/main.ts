import {
  ValidationPipe,
  VersioningType,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { createDocument, swaggerCustomOptions } from './configs/swagger';
import { EnvironmentVariables } from './interfaces/env.interface';
import { ResponseFilter } from './response/response.filter';
import { corsConfig } from './utils';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);

  app.enableVersioning({
    type: VersioningType.HEADER,
    header: 'Api-Version',
    defaultVersion: VERSION_NEUTRAL,
  });

  const config: ConfigService<EnvironmentVariables> = app.get(ConfigService);
  const port = process.env.PORT; // config.get('port', { infer: true });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new ResponseFilter());

  SwaggerModule.setup(
    'swagger',
    app,
    createDocument(app),
    swaggerCustomOptions,
  );

  const baseUrl = process.env.BASE_URL; //config.get('baseUrl', { infer: true });
  await app.listen(port, () => {
    console.info('[SWAGGER]', `${baseUrl}/swagger`);
    console.info('[ENV]', process.env.NODE_ENV);
  });
}

bootstrap();
