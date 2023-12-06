import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { AnthropometricsEntity } from '../../../../modules/core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateAnthropometricsByClientRequest } from '../dto/client-update-anthropometrics.dto';

describe('BaseBonusVideoService', () => {
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

  describe('update', () => {
    it('should not update existing anthrp record because of wrong data', async () => {
      const id = 1;
      const invalidAnthrpRequest: UpdateAnthropometricsByClientRequest = {
        waist: 100,
        weight: -100,
        shoulder: 100,
        hip: 20,
        hipVolume: 100,
        abdomen: 100,
      };
      await expect(service.update(id, invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
