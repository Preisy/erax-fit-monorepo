import { Test, TestingModule } from '@nestjs/testing';
import { BaseBonusVideoService } from '../base-bonus-video.service';
import { BonusVideoEntity } from '../entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BaseBonusVideoService', () => {
  let service: BaseBonusVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseBonusVideoService>(BaseBonusVideoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete', () => {
    it('should not delete bonus video because of incorrect id', async () => {
      const id = 666;
      await expect(service.delete(id)).rejects.toThrow();
    });
  });
});