import {
  Controller,
  Post,
  Patch,
  Get,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  UploadedFile,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { UserRole } from 'src/constants/constants';
import { RoleGuard } from '../../../modules/authentication/guards/role.guard';
import { AdminBonusVideoService } from './admin-bonus-video.service';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express } from 'express';
import { CreateVideoByAdminResponse } from './dto/admin-create-video.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';

@Controller('admin/bonus-video')
@ApiTags('Admin bonus video')
@AppAuthGuard(RoleGuard(UserRole.Admin))
@UseFilters(MainExceptionFilter)
@UsePipes(ValidationPipe)
export class AdminBonusVideoController {
  constructor(private readonly adminService: AdminBonusVideoService) {}

  @Post()
  @AppResponses({ status: 201, type: CreateVideoByAdminResponse })
  @ApiConsumes('multipart/form-data')
  @Throttle(5, 1)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          callback(null, `${file.originalname}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(mp4)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return await this.adminService.create(file);
  }

  @Patch('id')
  @AppResponses({ status: 200, type: AppStatusResponse })
  async updateAccesstoVideoForUser(@Param('id', ParseIntPipe) id: number, @Param('canWatchVideo') canWatch: boolean) {
    return await this.adminService.updateAccessToVideoForUser(id, canWatch);
  }
}
