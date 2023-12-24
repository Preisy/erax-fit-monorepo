import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';

describe('ClientAnthropometricsService', () => {
  let service: ClientAnthropometricsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClientAnthropometricsService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useClass: Repository,
        },
        BaseAnthropometrcisService,
      ],
    }).compile();

    service = module.get<ClientAnthropometricsService>(ClientAnthropometricsService);
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
