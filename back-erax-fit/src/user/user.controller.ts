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
import { UserService } from './user.service';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { CreateUserByAdminRequest, CreateUserRequest, CreateUserResponse } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { RoleGuard } from '../authentication/guards/role.guard';
import { UserRole } from '../constants/constants';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { AppResponses } from '../decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { AppSingleResponse } from '../dto/app-single-response.dto';

@BaseAuthGuard(RoleGuard(UserRole.Admin))
@Controller('users')
@ApiTags('Пользователи')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('create-user')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateUserRequest) {
    return await this.usersService.createUser(request);
  }

  @Get()
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  async getUsers(@Query() query: GetUsersRequest) {
    return await this.usersService.getUsers(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UpdateUserResponse) })
  async updateUser(@Param('id') id: number, @Req() req: RequestWithUser, @Body() body: UpdateUserRequest) {
    const request = new UpdateUserRequest(id, body.email, body.password, body.firstName, body.lastName);
    return await this.usersService.updateUser(request);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(DeleteUserByIdResponse) })
  async deleteUserById(@Param('id') id: number) {
    return await this.usersService.deleteUserById(+id);
  }
}
