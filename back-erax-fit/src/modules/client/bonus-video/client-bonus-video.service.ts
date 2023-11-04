import { Injectable } from '@nestjs/common';
import { BaseBonusVideoService } from 'src/modules/core/bonus-video/base-bonus-video.service';
import { BonusVideoEntity } from 'src/modules/core/bonus-video/entities/bonus-video.entity';
import { UserEntity } from 'src/modules/core/user/entities/user.entity';

@Injectable()
export class ClientBonusVideoService {
  constructor(private readonly baseService: BaseBonusVideoService) {}

  async findOneForUser(id: UserEntity['id'], link: BonusVideoEntity['fileLInk']) {
    return this.baseService.findOneForUser(id, link);
  }
}
