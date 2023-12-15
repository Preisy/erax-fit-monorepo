import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { AnthropometricsEntity } from '../../../../modules/core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
      ],
    }).compile();

    service = module.get<ClientAnthropometricsService>(ClientAnthropometricsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('delete method', () => {
    it("shouldn't delete nthropometrics record because of incorrect id", async () => {
      const id = 999999;
      await expect(service.delete(id)).rejects.toThrow();
    });
  });
});
