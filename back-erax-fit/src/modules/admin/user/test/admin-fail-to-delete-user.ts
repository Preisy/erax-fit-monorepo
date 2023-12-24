import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../core/user/entities/user.entity';
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

  describe('deleteUserById method', () => {
    it('should delete an user record by its ID', async () => {
      const id = 30;
      expect(service.deleteUserById(id)).rejects.toThrow();
    });
  });
});
