import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonusVideoEntity } from './entities/bonus-video.entity';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { ConfigService } from '@nestjs/config';
import { MainException } from '../../../exceptions/main.exception';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserEntity } from '../user/entities/user.entity';
import { BaseUserService } from '../user/base-user.service';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';

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

  async updateAccessToVideoForUser(userId: UserEntity['id'], canWatch: boolean): Promise<AppStatusResponse> {
    const { data: foundUser } = await this.userService.getUserById(userId);

    foundUser.canWatchVideo = canWatch;

    await this.userService.updateUser(userId, foundUser);

    return new AppStatusResponse(true);
  }
}
