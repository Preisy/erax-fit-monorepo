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
import { CreatePromptRequest } from 'src/modules/core/prompt/dto/create-prompt.dto';
import { AppPagination } from 'src/utils/app-pagination.util';
import { UserRole } from '../../../constants/constants';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { RoleGuard } from '../../authentication/guards/role.guard';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { UpdateWorkoutRequest } from '../../core/workout/dto/update-workout.dto';
import { AdminPromptService } from './admin-prompt.service';
import { UpdatePromptRequest } from 'src/modules/core/prompt/dto/update-prompt.dto';
import { GetPromptsRequest } from './dto/admin-get-prompts.dto';

@Controller('admin/prompts')
@ApiTags('Prompts')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
@BaseAuthGuard(RoleGuard(UserRole.Admin))
export class AdminPromptController {
  constructor(private readonly adminService: AdminPromptService) {}

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreatePromptRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response })
  async getAll(@Query() req: GetPromptsRequest, @Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query, req);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  async update(@Param('id') id: number, @Body() body: UpdatePromptRequest) {
    return await this.adminService.update(id, body);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  async deleteOne(@Param('id') id: number, @Req() req: RequestWithUser) {
    return await this.adminService.deleteOne(id);
  }
}
