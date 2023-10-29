import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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
import { MainException } from '../../../exceptions/main.exception';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { CreateWorkoutRequest } from '../../core/workout/dto/create-workout.dto';
import { UpdateWorkoutRequest } from '../../core/workout/dto/update-workout.dto';
import { AdminWorkoutService } from './admin-workout.service';
import { GetWorkoutByAdminResponse } from './dto/admin-get-workout.dto';

@Controller('admin')
@ApiTags('Тренировки')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminWorkoutController {
  constructor(private readonly adminService: AdminWorkoutService) {}

  @Post('workouts')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateWorkoutRequest) {
    return await this.adminService.create(request);
  }

  @Get('workouts')
  @AppResponses({ status: 200, type: AppPagination.Response })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get('workouts/:id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetWorkoutByAdminResponse) })
  async getOne(@Param('id') id: number) {
    return await this.adminService.findOne(id);
  }

  @Patch('workouts/:id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id') id: number, @Body() body: UpdateWorkoutRequest) {
    return await this.adminService.update(id, body);
  }

  @Delete(' workouts/:id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Param('id') id: number, @Req() req: RequestWithUser) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can delete other user');

    return await this.adminService.deleteOne(id);
  }
}
