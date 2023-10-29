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
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { CreateUserByAdminRequest } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { RoleGuard } from '../authentication/guards/role.guard';
import { UserRole } from '../../constants/constants';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { AppSingleResponse } from '../../dto/app-single-response.dto';

@BaseAuthGuard(RoleGuard(UserRole.Admin))
@Controller('admin/users')
@ApiTags('Admin')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('create-user')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateUserByAdminRequest) {
    return await this.adminService.create(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  async getUsers(@Query() query: GetUsersRequest) {
    return await this.adminService.getUsers(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.getUserById(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UpdateUserResponse) })
  async updateUser(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserRequest) {
    const request = new UpdateUserRequest(id, body.email, body.password, body.firstName, body.lastName);
    return await this.adminService.updateUser(request);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(DeleteUserByIdResponse) })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.deleteUserById(+id);
  }
}
