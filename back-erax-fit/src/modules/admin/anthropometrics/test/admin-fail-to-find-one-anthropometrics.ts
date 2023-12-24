import { Test, TestingModule } from '@nestjs/testing';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAnthropometrcisService } from '../../../core/anthropometrics/base-anthropometrics.service';
import { BaseUserService } from '../../../core/user/base-user.service';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { CreateAnthropometricsByAdminRequest } from '../dto/create-anthropometrics-by-admin.dto';

describe('AdminAnthropometricsService', () => {
  let service: AdminAnthropometricsService;
  let repository: Repository<AnthropometricsEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAnthropometricsService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useClass: Repository,
        },
        BaseAnthropometrcisService,
        BaseUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AdminAnthropometricsService>(AdminAnthropometricsService);
    repository = module.get<Repository<AnthropometricsEntity>>(AnthropometricsEntity);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne method', () => {
    it("shouldn't find anthropometrics record because of incorrect id and should throw 404", async () => {
      const request: CreateAnthropometricsByAdminRequest = {
        userId: 2,
        waist: 100,
        weight: 100,
        hip: 100,
        hipVolume: 100,
        abdomen: 100,
        shoulder: 100,
      };
      const savedData = await repository.save(await repository.create(request));
      await expect(service.findOne(savedData.id + 1)).rejects.toThrow();
    });
  });
});
