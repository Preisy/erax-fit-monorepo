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
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { RoleGuard } from '../authentication/guards/role.guard';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { UserRole } from '../../constants/constants';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { MainException } from '../../exceptions/main.exception';
import { CreateUserByAdminRequest, CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { UserService } from './user.service';
import { AppPagination } from 'src/utils/app-pagination.util';

@Controller('users')
@ApiTags('Пользователи')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateUserRequest) {
    return await this.usersService.createUser(request);
  }

  @Post('by-admin')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async createUserByAdmin(@Body() createUserDto: CreateUserByAdminRequest) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response })
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async getUsers(@Query() query: AppPagination.Request) {
    return await this.usersService.getAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @BaseAuthGuard()
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @BaseAuthGuard()
  async updateUser(@Param('id') id: number, @Req() req: RequestWithUser, @Body() body: UpdateUserRequest) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can edit other user');

    const request = new UpdateUserRequest(id, body.email!, body.password!, body.firstName, body.lastName);
    return await this.usersService.updateUser(request);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @BaseAuthGuard()
  async deleteUserById(@Param('id') id: number, @Req() req: RequestWithUser) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can delete other user');

    return await this.usersService.deleteUserById(+id);
  }
}
