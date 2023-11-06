import { Controller, UseFilters, UsePipes, ValidationPipe, Get, Req, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { ClientBonusVideoService } from './client-bonus-video.service';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';

@Controller('bonus-video')
@ApiTags('Client bonus video')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientBonusVideoController {
  constructor(private readonly clientService: ClientBonusVideoService) {}

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(BonusVideoEntity) })
  async getOne(@Req() req: RequestWithUser, @Param('link') link: string) {
    return await this.clientService.findOneForUser(req.user.id, link);
  }
}
