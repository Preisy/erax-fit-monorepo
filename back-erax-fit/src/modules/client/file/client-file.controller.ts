import { Controller, Get, Param, Res } from '@nestjs/common';
import type { Response } from 'express';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { BaseAuthGuard } from 'src/modules/authentication/guards/baseAuth.guard';

@Controller('files')
export class ClientFileController {
  @Get(':filename')
  @AppResponses({ status: 200, type: 'file' })
  @BaseAuthGuard()
  seeUploadedFile(@Param('filename') image: string, @Res() res: Response) {
    return res.sendFile(image, {
      root: './uploads',
    });
  }
}
