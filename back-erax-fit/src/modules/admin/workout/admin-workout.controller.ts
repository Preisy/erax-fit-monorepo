import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseAuthGuard } from 'src/modules/authentication/guards/baseAuth.guard';
import { AppPagination } from 'src/utils/app-pagination.util';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { CreateWorkoutRequest } from '../../core/workout/dto/create-workout.dto';
import { UpdateWorkoutRequest } from '../../core/workout/dto/update-workout.dto';
import { AdminWorkoutService } from './admin-workout.service';
import { GetWorkoutByAdminDTO } from './dto/admin-get-workout.dto';

@Controller('admin/workouts')
@ApiTags('Admin workouts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminWorkoutController {
  constructor(private readonly adminService: AdminWorkoutService) {}

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateWorkoutRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetWorkoutByAdminDTO) })
  async getOne(@Param('id') id: number) {
    return await this.adminService.findOne(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id') id: number, @Body() body: UpdateWorkoutRequest) {
    return await this.adminService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Param('id') id: number) {
    return await this.adminService.deleteOne(id);
  }
}
