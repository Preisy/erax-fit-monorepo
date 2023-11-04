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
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Throttle } from '@nestjs/throttler';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';
import { CreateAntropometricsByClientRequest } from './dto/client-create-antropometrics.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAntropometricsByClientRequest } from './dto/client-update-antropometrics.dto';
import { AntropometricsEntity } from '../../../modules/core/antropometrics/entities/antropometrics.entity';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppPagination } from '../../../utils/app-pagination.util';

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
    return this.clientService.create(req.user.id, body);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response<AntropometricsEntity> })
  async getAll(@Req() req: RequestWithUser, @Query() query: AppPagination.Request) {
    return await this.clientService.findAll(req.user.id, query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAntropometricsByClientRequest) {
    return this.clientService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.clientService.delete(id);
  }
}
