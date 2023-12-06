import { Test, TestingModule } from '@nestjs/testing';
import { BaseAnthropometrcisService } from '../../../../modules/core/anthropometrics/base-anthropometrics.service';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
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

  describe('delete method', () => {
    it("shouldn't delete nthropometrics record because of incorrect id", async () => {
      const id = 999999;
      await expect(service.delete(id)).rejects.toThrow();
    });
  });
});
