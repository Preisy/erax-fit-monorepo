import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../../modules/core/bonus-video/entities/bonus-video.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AdminBonusVideoService', () => {
  let service: AdminBonusVideoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminBonusVideoService>(AdminBonusVideoService);
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
