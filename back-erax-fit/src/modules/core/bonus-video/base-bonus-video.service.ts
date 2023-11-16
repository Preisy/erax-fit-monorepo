import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonusVideoEntity } from './entities/bonus-video.entity';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { BaseUserService } from '../user/base-user.service';

@Injectable()
export class BaseBonusVideoService {
  constructor(
    @InjectRepository(BonusVideoEntity)
    private readonly videoRepository: Repository<BonusVideoEntity>,
    private readonly userService: BaseUserService,
  ) {}

  async create(file: Express.Multer.File): Promise<AppSingleResponse<BonusVideoEntity>> {
    const newVideo = this.videoRepository.create({
      fileName: file.filename,
      path: file.filename,
      fileLInk: process.env.APP_BASE_URL + '/' + file.filename,
    });

    const savedVideo = await this.videoRepository.save(newVideo);

    return new AppSingleResponse(savedVideo);
  }

  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<BonusVideoEntity>,
  ): Promise<AppPagination.Response<BonusVideoEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.videoRepository);
    return getPaginatedData(query, options);
  }
}
