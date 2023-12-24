import { Test, TestingModule } from '@nestjs/testing';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BaseAnthropometricsService', () => {
  let service: BaseAnthropometrcisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseAnthropometrcisService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useValue: {
            findAndCount: jest.fn(() => AppDatePagination.Response<AnthropometricsEntity>),
          },
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

      const { data: result } = await service.findAll(query);

      const anthrpMap = result.reduce(
        (acc, value) => ({ ...acc, [value.id]: value }),
        {} as Record<number, AnthropometricsEntity>,
      );

      result.forEach((anthrp) => {
        const foundAnthrp = anthrpMap[anthrp.id];
        const anthrpCreatedAt = foundAnthrp.createdAt.getTime() || 0;
        expect(anthrpCreatedAt).toBeGreaterThanOrEqual(query.from?.getTime() || 0);
        expect(anthrpCreatedAt).toBeLessThanOrEqual(query.to?.getTime() || 0);
      });
    });
  });
});
