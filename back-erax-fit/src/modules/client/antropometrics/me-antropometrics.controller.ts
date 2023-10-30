import { Controller, Post, Req, Body, ParseIntPipe, Param, Patch, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppAuthGuard } from '../../authentication/guards/appAuth.guard';
import { MeAntropometricsService } from './me-antropometrics.service';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { Throttle } from '@nestjs/throttler';
import { RequestWithUser } from 'src/modules/authentication/types/requestWithUser.type';
import { createAntropometricsByMeRequest } from './dto/create-antropometrics-by-me.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { UpdateAntropometricsByMeRequest } from './dto/update-antropometrics-by-me.dto';
import { AntropometricsEntity } from 'src/modules/core/antropometrics/entities/antropometrics.entity';

@Controller('antropometrics')
@ApiTags('Client antropometrics')
@AppAuthGuard()
export class MeAntropometricsController {
  constructor(private readonly meService: MeAntropometricsService) {}

  @Post()
  @AppResponses({ status: 201, type: AppSingleResponse.type(AppSingleResponse) })
  @Throttle(5, 1)
  async create(@Req() req: RequestWithUser, @Body() body: createAntropometricsByMeRequest, status: boolean) {
    return this.meService.create(req.user.id, body, status);
  }

  @Get()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async getById(@Param('id', ParseIntPipe) id: number) {
    return this.meService.getById(id);
  }

  @Patch()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AntropometricsEntity) })
  async update(@Req() req: RequestWithUser, body: UpdateAntropometricsByMeRequest) {
    return this.meService.update(req.user.id, body);
  }

  @Post()
  @AppResponses({ status: 200, type: AppSingleResponse.type(AppStatusResponse) })
  @Throttle(5, 1)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return this.meService.delete(id);
  }
}
