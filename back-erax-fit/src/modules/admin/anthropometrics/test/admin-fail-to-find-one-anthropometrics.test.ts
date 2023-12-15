import { Test, TestingModule } from '@nestjs/testing';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AnthropometricsEntity } from '../../../../modules/core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      ],
    }).compile();

    service = module.get<AdminAnthropometricsService>(AdminAnthropometricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne method', () => {
    it("shouldn't find anthropometrics record because of incorrect id and should throw 404", async () => {
      const id = 999999;
      await expect(service.findOne(id)).rejects.toThrow();
    });
  });
});
