import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonusVideoEntity } from './entities/bonus-video.entity';
import { Repository } from 'typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { ConfigService } from '@nestjs/config';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserEntity } from '../user/entities/user.entity';
import { BaseUserService } from '../user/base-user.service';

@Injectable()
export class BaseBonusVideoService {
  constructor(
    @InjectRepository(BonusVideoEntity)
    private readonly videoRepository: Repository<BonusVideoEntity>,
    private readonly userService: BaseUserService,
  ) {}

  async create(file: Express.Multer.File): Promise<AppSingleResponse<BonusVideoEntity>> {
    const configService = new ConfigService();
    const newVideo = this.videoRepository.create({
      fileName: file.filename,
      path: file.filename,
      fileLInk: configService.get('APP_BASE_URL') + '/' + file.filename,
    });

    const savedVideo = await this.videoRepository.save(newVideo);
    if (!savedVideo) throw MainException.internalRequestError('Error upon saving file');

    return new AppSingleResponse(savedVideo);
  }

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<BonusVideoEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.videoRepository);
    return getPaginatedData(query);
  }

  async findOne(fileLInk: BonusVideoEntity['fileLInk']) {
    const video = await this.videoRepository.findOne({
      where: { fileLInk },
    });

    if (!video) throw MainException.entityNotFound(`Video with link ${fileLInk} not found`);

    return new AppSingleResponse(video);
  }

  async findOneForUser(
    id: UserEntity['id'],
    link: BonusVideoEntity['fileLInk'],
  ): Promise<AppSingleResponse<BonusVideoEntity>> {
    const { data: user } = await this.userService.getUserById(id);

    if (!user.canWatchVideo) throw MainException.forbidden(`Acces denied for user with id ${user.id}`);

    const video = await this.findOne(link);
    return video;
  }
}
