import { Controller, UseFilters, UsePipes, ValidationPipe, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserRole } from '../../../constants/constants';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { Get, Query, Param } from '@nestjs/common/decorators';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { AdminAntropometricsService } from './admin-antropometrics.service';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { AppDatePagination } from '../../../utils/app-pagination-date.util';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';

@Controller('admin/antropometrics')
@ApiTags('Admin antropometrics')
@AppAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAntropometricsController {
  constructor(private readonly adminService: AdminAntropometricsService) {}

  @Get()
  @AppResponses({ status: 200, type: AppDatePagination.Response<AntropometricsEntity> })
  async getAll(@Query() query: AppDatePagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppStatusResponse })
  async updateCron(
    @Param('previousTask') previousTask: string,
    @Param('nextTask') nextTask: string,
    @Param('id', ParseIntPipe) id: number,
    @Param('timeout') timeout: number,
  ) {
    return await this.adminService.updateCron(previousTask, nextTask, id, timeout);
  }
}
