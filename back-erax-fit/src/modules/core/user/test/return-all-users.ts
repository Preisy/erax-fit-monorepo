import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';
import { UserEntity } from '../entities/user.entity';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('AdminBonusVideoService', () => {
  let service: BaseUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseUserService,
        {
          provide: getRepositoryToken(UserEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseUserService>(BaseUserService);
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
