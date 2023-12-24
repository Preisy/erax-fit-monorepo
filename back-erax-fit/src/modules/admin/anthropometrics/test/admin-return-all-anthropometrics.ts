import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';

describe('AdminAnthropometricsService', () => {
  let service: AdminAnthropometricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAnthropometricsService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useClass: Repository,
        },
        BaseAnthropometrcisService,
      ],
    }).compile();

    service = module.get<AdminAnthropometricsService>(AdminAnthropometricsService);
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
