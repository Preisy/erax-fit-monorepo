import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';

describe('AdminUserService', () => {
  let service: AdminUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUserService],
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
