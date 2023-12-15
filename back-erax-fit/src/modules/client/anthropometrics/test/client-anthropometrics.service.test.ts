import { Test, TestingModule } from '@nestjs/testing';
import { ClientAnthropometricsService } from '../client-anthropometrics.service';
import { CreateAnthropometricsByClientRequest } from '../dto/client-create-anthropometrics.dto';
import { UpdateAnthropometricsByClientRequest } from '../dto/client-update-anthropometrics.dto';
import { MeService } from '../../me/me.service';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { AnthropometricsEntity } from '../../../../modules/core/anthropometrics/entities/anthropometrics.entity';

describe('ClientAnthropometricsService', () => {
  let service: ClientAnthropometricsService;
  let userService: MeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientAnthropometricsService],
    }).compile();
    service = module.get<ClientAnthropometricsService>(ClientAnthropometricsService);
  });

  describe('create method', () => {
    it('should create a new anthropometrics record and save it', async () => {
      const { data: user } = await userService.getMe(3);
      const request: CreateAnthropometricsByClientRequest = {
        weight: 90,
        waist: 40,
        abdomen: 88,
        shoulder: 101,
        hip: 56,
        hipVolume: 56,
        userId: user.id,
      };
      const savedAnthropometrics = await service.create(user, request);
      expect(savedAnthropometrics).toBeDefined();
      expect({ data: savedAnthropometrics.data }).toBeDefined();
    });
  });

  describe('findAll method', () => {
    it('it should return all antropometrics records between given period', async () => {
      const { data: user } = await userService.getMe(3);
      const query: AppDatePagination.Request = {
        from: new Date('2023-18-10'),
        to: new Date('2023-20-11'),
      };

      const result = await service.findAll(user, query);

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
      const updateRequest: UpdateAnthropometricsByClientRequest = {
        weight: 100,
        waist: 100,
        abdomen: 100,
        shoulder: 100,
        hip: 100,
        hipVolume: 100,
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
