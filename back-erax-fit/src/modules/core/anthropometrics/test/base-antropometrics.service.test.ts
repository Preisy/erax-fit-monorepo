import { Test, TestingModule } from '@nestjs/testing';
import { BaseAnthropometrcisService } from '../base-anthropometrics.service';
import { CreateAnthropometricsRequest } from '../dto/create-anthropometrics.dto';
import { UpdateAnthropometricsRequest } from '../dto/update-anthropometrics';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { AnthropometricsEntity } from '../entities/anthropometrics.entity';

describe('BaseAnthropometricsService', () => {
  let service: BaseAnthropometrcisService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseAnthropometrcisService],
    }).compile();
    service = module.get<BaseAnthropometrcisService>(BaseAnthropometrcisService);
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

  describe('findAll method', () => {
    it('it should return all antropometrics records between given period', async () => {
      const query: AppDatePagination.Request = {
        from: new Date('2023-18-10'),
        to: new Date('2023-20-11'),
      };

      const result = await service.findAll(query);

      expect(result).toBeInstanceOf(AppDatePagination.Response);
      expect(result.data).toBeInstanceOf(AppDatePagination.Response<AnthropometricsEntity>);
    });
  });

  describe('findOne method', () => {
    it('should find an anthropometrics record by its ID', async () => {
      const id = 1;
      const anthropometrics = await service.findOne(id);
      expect(anthropometrics).toBeDefined();
      expect({ data: anthropometrics }).toBe(id);
      expect({ data: anthropometrics.data }).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing anthropometrics record', async () => {
      const id = 1;
      const updateRequest: UpdateAnthropometricsRequest = {
        weight: 57,
        waist: 30,
        abdomen: 78,
        shoulder: 99,
        hip: 39,
        hipVolume: 33,
      };
      const savedAnthropometrics = await service.update(id, updateRequest);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics }).toBe(id);
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete an anthropometrics record by its ID', async () => {
      const id = 1;
      const affected = await service.delete(id);
      expect(affected).toBeDefined();
      expect(affected).toBe(1);
    });
  });
});
