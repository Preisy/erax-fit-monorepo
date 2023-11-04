import { Controller, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../../../constants/constants';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Get, Query, Param } from '@nestjs/common/decorators';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { AdminAntropometricsService } from './admin-antropometrics.service';
import { GetAntropometricsByAdminRequest } from './dto/admin-get-antropometrics.dto';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';

@Controller('admin/antropometrics')
@ApiTags('Admin antropometrics')
@AppAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAntropometricsController {
  constructor(private readonly adminService: AdminAntropometricsService) {}

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response<AntropometricsEntity> })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.findOne(id);
  }

  @Get(':id/date-range')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async findAntropometricsByDateRange(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: GetAntropometricsByAdminRequest,
  ) {
    return this.adminService.findAntropometricsByDateRange(id, request);
  }
}
