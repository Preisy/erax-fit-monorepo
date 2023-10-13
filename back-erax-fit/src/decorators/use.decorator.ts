import { UseFilters, UsePipes, applyDecorators } from '@nestjs/common';
import { MainExceptionFilter } from 'src/exceptions/main-exception.filter';
import { ValidationPipe } from 'src/pipes/validation.pipe';

export function Use(exceptionFilter: typeof MainExceptionFilter, validationPipe: typeof ValidationPipe) {

  return applyDecorators(
    UseFilters(exceptionFilter),
    UsePipes(validationPipe)
  );
}