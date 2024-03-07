import { BadRequestException, Injectable } from '@nestjs/common';

import axios from 'axios';
import { AccessQuery } from './dto';

@Injectable()
export class ExternalApiService {
  private readonly EXTERNAL_API: string = 'https://api.external.api.com';

  constructor() {}

  async access(query: AccessQuery) {
    try {
      const url = query?.url || this.EXTERNAL_API;
      const response = await axios.get(`${url}`);

      return response.data;
    } catch (error) {
      console.error(
        'An error occurred when accessing external api:',
        error.message,
      );
      throw new BadRequestException(
        'An error occurred when accessing external api.',
      );
    }
  }
}
