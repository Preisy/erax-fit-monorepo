import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BaseBonusVideoService', () => {
  let service: BaseAnthropometrcisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseAnthropometrcisService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseAnthropometrcisService>(BaseAnthropometrcisService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll method', () => {
    it('it should return all antropometrics records without any input data', async () => {
      const query = {} as AppDatePagination.Request;

      const result = await service.findAll(query);

      expect(result).toBeInstanceOf(AppDatePagination.Response);
      expect(result.data).toBeInstanceOf(AppDatePagination.Response<AnthropometricsEntity>);
    });
  });
});
