import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
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

  describe('getUserById method', () => {
    it('should not find user record because of wrong id', async () => {
      const id = 10000;
      expect(service.getUserById(id)).rejects.toThrow();
    });
  });
});
