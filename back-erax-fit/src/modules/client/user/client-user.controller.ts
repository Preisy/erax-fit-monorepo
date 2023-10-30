import {
  Body,
  Controller,
  Get,
  Patch,
  Param,
  Req,
  UseFilters,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ClientUserService } from './client-user.service';
import { UpdateUserByClientRequest } from './dto/update-client-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { RequestWithUser } from '../../authentication/types/requestWithUser.type';
import { UserEntity } from '../../core/user/entities/user.entity';

@AppAuthGuard()
@Controller('users')
@ApiTags('Client')
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientUserController {
  constructor(private readonly clientService: ClientUserService) {}

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.getUserById(id);
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(UserEntity) })
  async updateUser(@Req() req: RequestWithUser, @Body() body: UpdateUserByClientRequest) {
    return await this.clientService.updateUser(req.user.id, body);
  }
}
