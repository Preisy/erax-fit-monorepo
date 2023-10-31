import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { FileEntity } from 'src/modules/core/file/entity/file.entity';
import { Repository } from 'typeorm';

export function FileExists(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: FileExistsRule,
    });
  };
}

@ValidatorConstraint({ name: 'FileExists', async: true })
@Injectable()
export class FileExistsRule implements ValidatorConstraintInterface {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async validate(value: string) {
    const fileName = value.split('/').pop();
    console.log(fileName);
    const files = await this.fileRepository.find();
    files.forEach((file) => {
      console.log(file.fileName);
    });
    try {
      await this.fileRepository.findOne({
        where: {
          fileName: fileName,
        },
      });
    } catch (e) {
      console.log(false);
      return false;
    }
    console.log(true);
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'File not found';
  }
}
