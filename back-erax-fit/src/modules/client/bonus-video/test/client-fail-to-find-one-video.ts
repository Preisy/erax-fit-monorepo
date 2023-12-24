import { Test, TestingModule } from '@nestjs/testing';
import { ClientBonusVideoService } from '../client-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';

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

  describe('findOne method', () => {
    it('should not return any video because of wrong id', async () => {
      const id = 666;
      await expect(service.findOne(id)).rejects.toThrow();
    });
  });
});
