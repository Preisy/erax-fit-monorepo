import { Controller, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { UserRole } from '../../constants/constants';
import { RoleGuard } from '../authentication/guards/role.guard';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { CreateAntropometricsByAdminRequest } from './dto/create-antropometrics.dto';
import { AdminAntropometricsService } from './admin-antropometrics.service';
import { Body, Post, Get } from '@nestjs/common/decorators';

@Controller('antropometrics')
@ApiTags('Antropometrcis')
@BaseAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminAntropometricsController {
  constructor(private readonly adminService: AdminAntropometricsService) {}
  @Post()
  @Throttle(5, 1)
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  async create(@Body() req: CreateAntropometricsByAdminRequest) {
    return this.adminService.create(req);
  }

  @Get(':id')
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  async getAll() {}
}
