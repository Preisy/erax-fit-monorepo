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
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { GetUserResponse } from './dto/get-user.dto';
import { RoleGuard } from '../authentication/guards/role.guard';
import { UserRole } from '../constants/constants';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { BaseAuthGuard } from 'src/authentication/guards/baseAuth.guard';
import { Use } from 'src/decorators/use.decorator';
import { DefaultApiResponse } from 'src/decorators/default.api.resonse.decorator';
import { Response200 } from 'src/api-responses/response.200';
import { Response500 } from 'src/api-responses/response.500';
import { Response400 } from 'src/api-responses/response.400';

@Controller('users')
@ApiTags('Пользователи')
@UseFilters(MainExceptionFilter)
@Use(MainExceptionFilter, ValidationPipe)
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  @DefaultApiResponse(new Response200(CreateUserResponse), new Response500(), new Response400())
  async create(@Body() request: CreateUserRequest) {
    return await this.usersService.createUser(request);
  }

  @Post('by-admin')
  @DefaultApiResponse(new Response200(CreateUserResponse), new Response500(), new Response400())
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async createUserByAdmin(@Body() createUserDto: CreateUserByAdminRequest) {
    return await this.usersService.createUser(createUserDto);
  }

  @Get()
  @DefaultApiResponse(new Response200(GetUsersResponse), new Response500(), new Response400())
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async getUsers(@Query() query: GetUsersRequest) {
    return await this.usersService.getUsers(query);
  }

  @Get(':id')
  @DefaultApiResponse(new Response200(GetUserResponse), new Response500(), new Response400())
  @BaseAuthGuard()
  async getUserById(@Param('id') id: number) {
    return await this.usersService.getUserById(id);
  }

  @Patch(':id')
  @DefaultApiResponse(new Response200(UpdateUserResponse), new Response500(), new Response400())
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
  @DefaultApiResponse(new Response200(DeleteUserByIdResponse), new Response500(), new Response400())
  @BaseAuthGuard()
  async deleteUserById(@Param('id') id: number, @Req() req: RequestWithUser) {
    if (req.user.role != UserRole.Admin && id != req.user.id)
      throw MainException.forbidden('Only admin can delete other user');

    return await this.usersService.deleteUserById(+id);
  }
}
