import { Controller, UseFilters, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseAuthGuard } from '../../authentication/guards/baseAuth.guard';
import { UserRole } from '../../../constants/constants';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Get, Query, Param } from '@nestjs/common/decorators';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { AdminAntropometricsService } from './admin-antropometrics.service';

@Controller('admin/antropometrics')
@ApiTags('Antropometrcis')
@BaseAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAntropometricsController {
  constructor(private readonly adminService: AdminAntropometricsService) {}

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

  @Get(':date')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async getAntropometricsByDateRange(@Param('id', ParseIntPipe) id: number, startDate: Date, endDate: Date) {
    return this.adminService.getAntropometricsByDateRange(id, startDate, endDate);
  }
}
