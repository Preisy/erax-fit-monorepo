import {
  Controller,
  Post,
  Req,
  Body,
  ParseIntPipe,
  Param,
  Patch,
  Get,
  Delete,
  UseFilters,
  UsePipes,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { ClientAntropometricsService } from './client-antropometrics.service';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { Throttle } from '@nestjs/throttler';
import { RequestWithUser } from 'src/modules/authentication/types/requestWithUser.type';
import { CreateAntropometricsByClientRequest } from './dto/create-antropometrics-by-client.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { UpdateAntropometricsByClientRequest } from './dto/update-antropometrics-by-client.dto';
import { AntropometricsEntity } from '../../../modules/core/antropometrics/entities/antropometrics.entity';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppPagination } from 'src/utils/app-pagination.util';

@Controller('antropometrics')
@ApiTags('Client antropometrics')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientAntropometricsController {
  constructor(private readonly clientService: ClientAntropometricsService) {}

  @Post()
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Req() req: RequestWithUser, @Body() body: CreateAntropometricsByClientRequest) {
    console.log(req.user.id);
    return this.clientService.create(req.user.id, body);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async getOne(@Param('id') id: number, @Req() req: RequestWithUser) {
    return this.clientService.findOne(req.user.id, id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async update(@Param('id') id: number, @Body() body: UpdateAntropometricsByClientRequest) {
    return this.clientService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.delete(id);
  }
}
