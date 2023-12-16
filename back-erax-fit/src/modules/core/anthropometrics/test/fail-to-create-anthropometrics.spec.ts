import { Test, TestingModule } from '@nestjs/testing';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';

describe('BaseAnthropometricsService', () => {
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

  describe('create', () => {
    it('should not create new anthrp record because of wrong data', async () => {
      const invalidAnthrpRequest: CreateAnthropometricsRequest = {
        userId: 2,
        waist: 9,
        weight: -2,
        shoulder: 9999,
        hip: 30,
        hipVolume: 31,
        abdomen: 30,
      };
      await expect(service.create(invalidAnthrpRequest)).rejects.toThrow();
    });
  });

  describe('create', () => {
    it('should not create new anthrp record because user with given id not found', async () => {
      const invalidAnthrpRequest: CreateAnthropometricsRequest = {
        userId: 2222,
        waist: 90,
        weight: 90,
        shoulder: 99,
        hip: 60,
        hipVolume: 41,
        abdomen: 50,
      };
      await expect(service.create(invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
