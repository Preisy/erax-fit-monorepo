import { Test, TestingModule } from '@nestjs/testing';
import { ClientBonusVideoService } from '../client-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      ],
    }).compile();

    service = module.get<ClientBonusVideoService>(ClientBonusVideoService);
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
