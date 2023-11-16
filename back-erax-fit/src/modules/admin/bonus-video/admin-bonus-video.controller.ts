import {
  Controller,
  Post,
  Get,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
  UploadedFile,
  Param,
  Query,
  ParseIntPipe,
  Delete,
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
import { Express } from 'express';
import { CreateVideoByAdminResponse } from './dto/admin-create-video.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BonusVideoEntity } from '../../../modules/core/bonus-video/entities/bonus-video.entity';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';

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
  @AppResponses({ status: 200, type: AppPagination.Response.type(BonusVideoEntity) })
  async getAll(@Query() query: AppPagination.Request) {
    return await this.adminService.findAll(query);
  }

  @Get(':id')
  @AppResponses({ status: 200, type: AppSingleResponse.type(BonusVideoEntity) })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.findOne(id);
  }

  @Delete(':id')
  @AppResponses({ status: 200, type: AppStatusResponse })
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.adminService.delete(id);
  }
}
