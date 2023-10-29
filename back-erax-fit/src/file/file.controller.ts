import {
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppResponses } from 'src/decorators/app-responses.decorator';
import { CreateFileResponse } from './dto/create-file.dto';
import { diskStorage } from 'multer';
import { BaseAuthGuard } from 'src/authentication/guards/baseAuth.guard';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import type { Response } from 'express';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { RoleGuard } from 'src/authentication/guards/role.guard';
import { UserRole } from 'src/constants/constants';
import { AppPagination } from 'src/utils/app-pagination.util';

@Controller('files')
export class FileController {
  constructor(private readonly filesService: FileService) {}

  @Post()
  @AppResponses({ status: 201, type: CreateFileResponse })
  @ApiConsumes('multipart/form-data')
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
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
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
  create(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: /(jpg|jpeg|png|mp4)$/ })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.filesService.createFile(file);
  }

  @Get(':filename')
  @AppResponses({ status: 200, type: 'file' })
  @BaseAuthGuard()
  seeUploadedFile(@Param('filename') image: string, @Res() res: Response) {
    return res.sendFile(image, {
      root: './uploads',
    });
  }

  @Get()
  @AppResponses({ status: 200, type: AppPagination.Response })
  @BaseAuthGuard(RoleGuard(UserRole.Admin))
  async getUsers(@Query() query: AppPagination.Request) {
    return await this.filesService.getFiles(query);
  }
}
