import { Injectable } from '@nestjs/common';
import { BaseBonusVideoService } from '../../../modules/core/bonus-video/base-bonus-video.service';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';

@Injectable()
export class AdminBonusVideoService {
  constructor(private readonly baseService: BaseBonusVideoService) {}

  async create(file: Express.Multer.File) {
    return this.baseService.create(file);
  }

  async updateAccessToVideoForUser(userId: UserEntity['id'], canWatch: boolean) {
    return await this.baseService.updateAccessToVideoForUser(userId, canWatch);
  }
}
