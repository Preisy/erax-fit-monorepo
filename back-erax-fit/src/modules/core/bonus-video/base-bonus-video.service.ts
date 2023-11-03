import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BonusVideoEntity } from './entities/bonus-video.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BaseBonusVideoService {
  constructor(@InjectRepository(BonusVideoEntity) private readonly videoRepository: Repository<BonusVideoEntity>) {}
}
