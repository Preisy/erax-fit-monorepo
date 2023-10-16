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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import {
  CreateUserByAdminRequest,
  CreateUserRequest,
  CreateUserResponse,
} from './dto/create-user.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../exceptions/main-exception.filter';
import { MainException } from '../exceptions/main.exception';
import { Throttle } from '@nestjs/throttler';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { GetUserResponse } from './dto/get-user.dto';
import { RoleGuard } from '../authentication/guards/role.guard';
import { UserRole } from '../constants/constants';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { BaseAuthGuard } from 'src/authentication/guards/baseAuth.guard';
import { JWTAuthGuard } from 'src/authentication/guards/jwtAuth.guard';

@Controller('users')
@ApiTags('Пользователи')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @ApiResponse({
    status: 200,
    type: CreateUserResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error occurred (while internal HTTP requests, etc).',
    type: MainException,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (provided data is not valid).',
    type: MainException,
  })
  @Throttle(5, 1)
  async create(@Body() request: CreateUserRequest) {
    return await this.usersService.createUser(request);
  }

  @Post('by-admin')
  @ApiResponse({
    status: 200,
    type: CreateUserResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error occurred (while internal HTTP requests, etc).',
    type: MainException,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (provided data is not valid).',
    type: MainException,
  })
  @Throttle(5, 1)
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async createUserByAdmin(@Body() createUserDto: CreateUserByAdminRequest) {
    return await this.usersService.createUser(createUserDto);
  }

  @UseGuards(JWTAuthGuard)
  @Get()
  @ApiResponse({
    status: 200,
    type: GetUsersResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error occurred (while internal HTTP requests, etc).',
    type: MainException,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (provided data is not valid).',
    type: MainException,
  })
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async getUsers(@Query() query: GetUsersRequest) {
    return await this.usersService.getUsers(query);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: GetUserResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error occurred (while internal HTTP requests, etc).',
    type: MainException,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (provided data is not valid).',
    type: MainException,
  })
  @BaseAuthGuard()
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: UpdateUserResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error occurred (while internal HTTP requests, etc).',
    type: MainException,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (provided data is not valid).',
    type: MainException,
  })
  @BaseAuthGuard()
  async updateUser(
    @Param('id') id: number,
    @Req() req: RequestWithUser,
    @Body() body: UpdateUserRequest,
  ) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can edit other user');

    const request = new UpdateUserRequest(
      id,
      body.email,
      body.password,
      body.firstName,
      body.lastName,
    );
    return await this.usersService.updateUser(request);
  }

  @Delete(':id')
  @ApiResponse({
    status: 200,
    type: DeleteUserByIdResponse,
  })
  @ApiResponse({
    status: 500,
    description: 'Internal error occurred (while internal HTTP requests, etc).',
    type: MainException,
  })
  @ApiResponse({
    status: 400,
    description: 'Validation error (provided data is not valid).',
    type: MainException,
  })
  @BaseAuthGuard()
  async deleteUserById(@Param('id') id: number, @Req() req: RequestWithUser) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can delete other user');

    return await this.usersService.deleteUserById(+id);
  }
}
