import { Test, TestingModule } from '@nestjs/testing';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnthropometricsByAdminRequest } from '../dto/create-anthropometrics-by-admin.dto';
import { BaseAnthropometrcisService } from '../../../../modules/core/anthropometrics/base-anthropometrics.service';

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

  describe('create', () => {
    it('should not create new anthrp record because of wrong data', async () => {
      const invalidAnthrpRequest: CreateAnthropometricsByAdminRequest = {
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
    it('should not create new anthrp record because of wrong userId', async () => {
      const invalidAnthrpRequest: CreateAnthropometricsByAdminRequest = {
        userId: 666,
        waist: 80,
        weight: 70,
        shoulder: 99,
        hip: 60,
        hipVolume: 50,
        abdomen: 40,
      };
      await expect(service.create(invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
