import { Controller, Get, Query, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { BaseAuthGuard } from 'src/modules/authentication/guards/baseAuth.guard';
import { AppPagination } from 'src/utils/app-pagination.util';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { ClientFoodService } from './client-food.service';

@Controller()
@ApiTags('Food')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientFoodController {
  constructor(private readonly clientService: ClientFoodService) {}

  @Get('food')
  @AppResponses({ status: 200, type: AppPagination.Response })
  @BaseAuthGuard()
  async getAll(@Query() query: AppPagination.Request) {
    return await this.clientService.findAll(query);
  }
}
