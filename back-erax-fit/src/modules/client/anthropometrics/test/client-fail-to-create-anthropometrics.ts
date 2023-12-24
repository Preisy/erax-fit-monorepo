import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnthropometricsByClientRequest } from '../dto/client-create-anthropometrics.dto';
import { MeService } from '../../me/me.service';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';

describe('ClientAnthropometricsService', () => {
  let service: ClientAnthropometricsService;
  let userService: MeService;

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

  describe('create', () => {
    it('should not create new anthrp record because of wrong data', async () => {
      const { data: user } = await userService.getMe(2);
      const invalidAnthrpRequest: CreateAnthropometricsByClientRequest = {
        userId: user.id,
        waist: 100,
        weight: -100,
        shoulder: 100,
        hip: 20,
        hipVolume: 100,
        abdomen: 100,
      };
      await expect(service.create(user, invalidAnthrpRequest)).rejects.toThrow();
    });
  });
});
