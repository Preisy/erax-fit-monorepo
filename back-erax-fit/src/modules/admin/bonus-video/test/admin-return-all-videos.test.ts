import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../../modules/core/bonus-video/entities/bonus-video.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
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

  describe('findAll method', () => {
    it('should return an AppPaginationResponse', async () => {
      const query = {} as AppPagination.Request;

      const result = await service.findAll(query);

      expect(result).toBeInstanceOf(AppPagination.Response);
      expect(result.data).toBeInstanceOf(AppPagination.Response<BonusVideoEntity>);
    });
  });
});
