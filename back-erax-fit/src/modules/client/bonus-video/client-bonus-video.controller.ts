import { Controller, UseFilters, UsePipes, ValidationPipe, Get, Req, Param, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { RequestWithUser } from '../../../modules/authentication/types/requestWithUser.type';
import { Response } from 'express';
import { MainException } from 'src/exceptions/main.exception';

@Controller('bonus-video')
@ApiTags('Client bonus video')
@AppAuthGuard()
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class ClientBonusVideoController {
  @Get(':filename')
  @AppResponses({ status: 200, type: 'file' })
  async getUploadedFile(@Req() req: RequestWithUser, @Param('filename') image: string, @Res() res: Response) {
    if (!req.user.canWatchVideo) throw MainException.forbidden(`Access denied for user with id ${req.user.id}`);
    return res.sendFile(image, {
      root: './uploads',
    });
  }
}
