import { Injectable } from '@nestjs/common';
import { BaseBonusVideoService } from 'src/modules/core/bonus-video/base-bonus-video.service';

@Injectable()
export class AdminBonusVideoService {
  constructor(private readonly baseService: BaseBonusVideoService) {}
}
