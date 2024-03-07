import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ExternalApiService } from './external-api.service';
import { ApiVersion } from 'src/enums';
import { ApiController } from 'src/decorators';
import { AccessQuery } from './dto';

@Controller({ path: 'xternal-api', version: ApiVersion.V1 })
@ApiController({ tag: `External API`, version: ApiVersion.V1 })
@Controller()
export class ExternalApiController {
  constructor(private readonly externalApiService: ExternalApiService) {}

  @ApiOperation({ description: 'Access External API' })
  @Post()
  async access(@Query() query: AccessQuery) {
    try {
      const result = await this.externalApiService.access(query);
      return result;
    } catch (error) {
      if (error?.response) return error.response;
      return error;
    }
  }
}
