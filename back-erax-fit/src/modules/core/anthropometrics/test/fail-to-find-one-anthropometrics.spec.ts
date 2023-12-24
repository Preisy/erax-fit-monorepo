import { Test, TestingModule } from '@nestjs/testing';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
            findOne: jest.fn(() => AnthropometricsEntity),
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

  describe('findOne method', () => {
    it("shouldn't find anthropometrics record because of incorrect id and should throw 404", async () => {
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
      await expect(service.findOne(savedData.id + 5)).resolves.toBeNull;
    });
  });
});
