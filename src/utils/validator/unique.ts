import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { AppDataSource } from 'src/database/data-source';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUnique implements ValidatorConstraintInterface {
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    const { constraints, property } = validationArguments;

    return AppDataSource.manager
      .findOneBy(constraints[0], {
        [property]: value,
      })
      .then((item) => {
        if (item) return false;
        return true;
      });
  }
}
