import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { UserEntity } from '../../../core/user/entities/user.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseUserService } from '../../../core/user/base-user.service';

describe('AdminUserService', () => {
  let service: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
        BaseUserService,
      ],
    }).compile();

    service = module.get<AdminUserService>(AdminUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getUsers method', () => {
    it('should return an AppPaginationResponse', async () => {
      const query = {} as AppPagination.Request;

      const result = await service.getUsers(query);

      expect(result).toBeInstanceOf(AppPagination.Response);
      expect(result.data).toBeInstanceOf(AppPagination.Response<UserEntity>);
    });
  });
});
