import { Test, TestingModule } from '@nestjs/testing';
import { AdminAnthropometricsService } from '../admin-anthropometrics.service';
import { AnthropometricsEntity } from '../../../core/anthropometrics/entities/anthropometrics.entity';
import { AppDatePagination } from '../../../../utils/app-date-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserService } from '../../../core/user/base-user.service';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { UserRole } from '../../../../constants/constants';
import { CreateAnthropometricsByAdminRequest } from '../dto/create-anthropometrics-by-admin.dto';
import { AdminUserService } from '../../user/admin-user.service';
import { UserEntity } from '../../../../modules/core/user/entities/user.entity';

describe('AdminAnthropometricsService', () => {
  let service: AdminAnthropometricsService;
  let userRepository: Repository<AnthropometricsEntity>;
  let userService: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminAnthropometricsService,
        {
          provide: getRepositoryToken(AnthropometricsEntity),
          useClass: Repository,
        },
        {
          provide: BaseUserService,
          useValue: {
            getUsers: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AdminAnthropometricsService>(AdminAnthropometricsService);
    userRepository = module.get<Repository<AnthropometricsEntity>>(AnthropometricsEntity);
    userService = module.get<AdminUserService>(AdminUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should create a new anthropometrics record', async () => {
      const request: CreateAnthropometricsByAdminRequest = {
        userId: 2,
        waist: 100,
        weight: 75,
        hip: 50,
        hipVolume: 60,
        abdomen: 100,
        shoulder: 99,
      };

      const savedAnthrp = await service.create(request);

      expect(savedAnthrp).toBeInstanceOf(AnthropometricsEntity);
      expect({ data: savedAnthrp.data.userId }).toBe(request.userId);
      expect({ data: savedAnthrp.data }).toBeDefined();
    });
  });

  describe('findAll method', () => {
    it('it should return antropometrics records without between given period', async () => {
      const query: AppDatePagination.Request = {
        from: new Date('2023-31-10'),
        to: new Date('2023-31-11'),
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

  describe('createAnthropometricsCron method', () => {
    it('should create anthropometrics records based on the cron schedule', async () => {
      // Mock the dependencies
      const users = [{ id: 5, anthrpJobPeriod: 1, createdAt: new Date() }] as UserEntity[];
      userService.getUsers({ data: users } as AppPagination.Request);

      const latestAnthropometrics = [{ userId: 1, createdAt: new Date() }] as AnthropometricsEntity[];
      service.findLatestAnthropometricsForEachUser = jest.fn().mockResolvedValue(latestAnthropometrics);

      // Call the method
      await service.createAnthropometricsCron();

      // Assert the expected actions
      expect(userService.getUsers).toHaveBeenCalledWith(new AppPagination.Request(), {
        where: { role: UserRole.Client },
      });
      expect(userRepository.save).toHaveBeenCalledWith({ userId: 1 });
    });
  });
});
