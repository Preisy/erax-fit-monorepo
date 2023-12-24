import { Test, TestingModule } from '@nestjs/testing';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';
import { UpdateAnthropometricsRequest } from '../dto/update-anthropometrics';
//import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppStatusResponse } from '../../../../dto/app-status-response.dto';

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
            delete: jest.fn(() => AppStatusResponse),
            findAndCount: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BaseAnthropometrcisService>(BaseAnthropometrcisService);
    repository = module.get<Repository<AnthropometricsEntity>>(getRepositoryToken(AnthropometricsEntity));
  });

  describe('create method', () => {
    it('should create a new anthropometrics record and save it', async () => {
      const request: CreateAnthropometricsRequest = {
        weight: 67,
        waist: 33,
        abdomen: 71,
        shoulder: 92,
        hip: 30,
        hipVolume: 30,
        userId: 2,
      };
      const savedAnthropometrics = await service.create(request);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  // describe('findAll method', () => {
  //   it('it should return all antropometrics records between given period', async () => {
  //     const query: AppDatePagination.Request = {
  //       from: new Date('2023-18-10'),
  //       to: new Date('2023-20-11'),
  //     };

  //     const result = await service.findAll(query);

  //     expect(result).toBeInstanceOf(AppDatePagination.Response);
  //     expect(result.data).toBeInstanceOf(AppDatePagination.Response<AnthropometricsEntity>);
  //   });
  // });

  describe('findOne method', () => {
    it('should find an anthropometrics record by its ID', async () => {
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

      const anthropometrics = await service.findOne(savedData.id);
      expect(anthropometrics).toBeDefined();
      expect({ data: anthropometrics.data }).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing anthropometrics record', async () => {
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

      const updateRequest: UpdateAnthropometricsRequest = {
        weight: 57,
        waist: 30,
        abdomen: 78,
        shoulder: 99,
        hip: 39,
        hipVolume: 33,
      };
      const savedAnthropometrics = await service.update(savedData.id, updateRequest);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete an anthropometrics record by its ID', async () => {
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

      const affected = await service.delete(savedData.id);
      expect(affected).toBeDefined();
      expect(affected).toEqual({ status: false });
    });
  });
});
