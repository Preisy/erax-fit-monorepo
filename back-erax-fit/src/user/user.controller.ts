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
import { MainException } from '../exceptions/main.exception';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { RoleGuard } from '../authentication/guards/role.guard';
import { UserRole } from '../constants/constants';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { AppResponses } from '../decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { AppSingleResponse } from '../dto/app-single-response.dto';

@Controller('users')
@ApiTags('Пользователи')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('create')
  @AppResponses({
    status: 200,
    type: AppSingleResponse.type(CreateUserResponse),
  })
  @Throttle(5, 1)
  async create(@Body() request: CreateUserRequest) {
    return await this.usersService.createUser(request);
  }

  @Post('by-admin')
  @AppResponses({
    status: 200,
    type: AppSingleResponse.type(CreateUserResponse),
  })
  @Throttle(5, 1)
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async createUserByAdmin(@Body() createUserDto: CreateUserByAdminRequest) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async getUsers(@Query() query: GetUsersRequest) {
    return await this.usersService.getUsers(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  @BaseAuthGuard()
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Patch(':id')
  @AppResponses({
    status: 200,
    type: AppSingleResponse.type(UpdateUserResponse),
  })
  @BaseAuthGuard()
  async updateUser(@Param('id') id: number, @Req() req: RequestWithUser, @Body() body: UpdateUserRequest) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can edit other user');

    const request = new UpdateUserRequest(id, body.email, body.password, body.firstName, body.lastName);
    return await this.usersService.updateUser(request);
  }

  @Delete(':id')
  @AppResponses({
    status: 200,
    type: AppSingleResponse.type(DeleteUserByIdResponse),
  })
  @BaseAuthGuard()
  async deleteUserById(@Param('id') id: number, @Req() req: RequestWithUser) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can delete other user');

    return await this.usersService.deleteUserById(+id);
  }
}
