import { Test, TestingModule } from '@nestjs/testing';
import { ClientBonusVideoService } from '../client-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../../modules/core/bonus-video/base-bonus-video.service';

describe('ClientVideoService', () => {
  let service: ClientBonusVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
        BaseBonusVideoService,
      ],
    }).compile();

    service = module.get<ClientBonusVideoService>(ClientBonusVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('should return a single video record', async () => {
      const id = 1;
      const video = await service.findOne(id);
      expect(video).toBeDefined();
      expect({ data: video }).toBe(id);
      expect({ data: video.data }).toBeDefined();
    });
  });
});
