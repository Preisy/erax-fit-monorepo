import { Test, TestingModule } from '@nestjs/testing';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { Repository } from 'typeorm';
import { UpdateAnthropometricsRequest } from '../dto/update-anthropometrics';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';

describe('BaseAnthropometricsService', () => {
  let service: BaseAnthropometrcisService;
  let repository: Repository<AnthropometricsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseAnthropometrcisService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useValue: {
            save: jest.fn(() => AnthropometricsEntity),
            create: jest.fn(() => AnthropometricsEntity),
          },
        },
      ],
    }).compile();

    service = module.get<BaseAnthropometrcisService>(BaseAnthropometrcisService);
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('update', () => {
    it('should not update existing anthrp record because of wrong data', async () => {
      const request: CreateAnthropometricsRequest = {
        userId: 2,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };

      const savedData = await repository.save(await repository.create(request));
      const invalidAnthrpRequest: UpdateAnthropometricsRequest = {
        waist: 9,
        weight: -2,
        shoulder: 9999,
        hip: 30,
        hipVolume: 31,
        abdomen: 30,
      };

      await expect(service.update(savedData.id, invalidAnthrpRequest)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should not update existing anthrp record because given id not found', async () => {
      const request: CreateAnthropometricsRequest = {
        userId: 2,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };

      const savedData = await repository.save(await repository.create(request));

      const invalidAnthrpRequest: UpdateAnthropometricsRequest = {
        waist: 90,
        weight: 90,
        shoulder: 90,
        hip: 90,
        hipVolume: 90,
        abdomen: 90,
      };

      await expect(service.update(savedData.id, invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
