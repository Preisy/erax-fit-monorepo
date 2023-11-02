import { Injectable } from '@nestjs/common';
import { BaseFileService } from 'src/modules/core/file/base-file.service';
import { FileEntity } from 'src/modules/core/file/entity/file.entity';
import { AppPagination } from 'src/utils/app-pagination.util';
import { CreateFileByAdminResponse } from './dto/admin-create-file.dto';

@Injectable()
export class AdminFileService {
  constructor(private readonly baseService: BaseFileService) {}

  async create(file: Express.Multer.File): Promise<CreateFileByAdminResponse> {
    return this.baseService.create(file);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<FileEntity>> {
    return this.baseService.findAll(query);
  }
}
