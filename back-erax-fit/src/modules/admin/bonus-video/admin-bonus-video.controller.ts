import {
  Controller,
  Post,
  Patch,
  Get,
  Res,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  UploadedFile,
  Param,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { MainExceptionFilter } from '../../../exceptions/main-exception.filter';
import { AppAuthGuard } from '../../../modules/authentication/guards/appAuth.guard';
import { UserRole } from '../../../constants/constants';
import { RoleGuard } from '../../../modules/authentication/guards/role.guard';
import { AdminBonusVideoService } from './admin-bonus-video.service';
import { AppResponses } from '../../../decorators/app-responses.decorator';
import { Throttle } from '@nestjs/throttler';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Express, Response } from 'express';
import { CreateVideoByAdminResponse } from './dto/admin-create-video.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { UpdateAccessToVideoForUserRequest } from './dto/update-user-access.dto';

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

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response<BonusVideoEntity> })
  async getAll(query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':filename')
  @AppResponses({ status: 200, type: 'file' })
  async getUploadedFile(@Param('filename') image: string, @Res() res: Response) {
    return res.sendFile(image, {
      root: './uploads',
    });
  }

  @Patch(':id')
  @AppResponses({ status: 200, type: AppStatusResponse })
  async updateAccesstoVideoForUser(@Body() body: UpdateAccessToVideoForUserRequest) {
    return await this.adminService.updateAccessToVideoForUser(body.userId, body.canWatch);
  }
}
