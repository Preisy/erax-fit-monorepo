import { Body, Controller, Delete, Get, Patch, Post, Req, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { ClientService } from './client.service';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { CreateClientRequest } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../exceptions/main-exception.filter';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { GetUsersResponse } from './dto/get-users.dto';
import { BaseAuthGuard } from '../authentication/guards/baseAuth.guard';
import { AppResponses } from '../../decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { RequestWithUser } from '../authentication/types/requestWithUser.type';

@BaseAuthGuard()
@Controller('users')
@ApiTags('Client')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('create-user')
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Body() request: CreateClientRequest) {
    return await this.clientService.create(request);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(GetUsersResponse) })
  async getUserById(@Req() req: RequestWithUser) {
    return await this.clientService.getUserById(req.user.id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UpdateUserResponse) })
  async updateUser(@Req() req: RequestWithUser, @Body() body: UpdateUserRequest) {
    const request = new UpdateUserRequest(req.user.id, body.email, body.password, body.firstName, body.lastName);
    return await this.clientService.updateUser(request);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(DeleteUserByIdResponse) })
  async deleteUserById(@Req() req: RequestWithUser) {
    return await this.clientService.deleteUserById(+req.user.id);
  }
}
