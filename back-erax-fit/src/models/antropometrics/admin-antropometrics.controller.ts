import { Controller, UseFilters, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { UserRole } from '../../constants/constants';
import { RoleGuard } from '../authentication/guards/role.guard';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { CreateAntropometricsByAdminRequest } from './dto/create-antropometrics.dto';
import { AdminAntropometricsService } from './admin-antropometrics.service';
import { Body, Post, Get, Query, Param, Patch, Delete } from '@nestjs/common/decorators';
import { AppPagination } from '../../utils/app-pagination.util';
import { AntropometricsEntity } from './entities/antropometrics.entity';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';

@Controller('admin/antropometrics')
@ApiTags('Antropometrcis')
@BaseAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAntropometricsController {
  constructor(private readonly adminService: AdminAntropometricsService) {}

  @Post()
  @Throttle(5, 1)
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  create(@Body() req: CreateAntropometricsByAdminRequest) {
    return this.adminService.create(req);
  }

  @Get()
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppPagination.Response) })
  getAll(@Query() req: AppPagination.Request) {
    return this.adminService.getAll(req);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.getById(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  update() {}

  @Delete(':id')
  @AppResponses({ status: 200, type: AppStatusResponse })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.delete(id);
  }
}
