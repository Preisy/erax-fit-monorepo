import { Test, TestingModule } from '@nestjs/testing';
import { AdminUserService } from '../admin-user.service';
import { UpdateUserByAdminRequest } from '../dto/update-admin-user.dto';

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

  describe('updateUser method', () => {
    it('should not update an existing user record because of wrong id', async () => {
      const id = 20;
      const updateRequest: UpdateUserByAdminRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
        canWatchVideo: true,
        anthrpJobPeriod: 1,
      };
      expect(service.updateUser(id, updateRequest)).rejects.toThrow();
    });
  });

  describe('updateUser method', () => {
    it('should not update an existing user record because of numeric fields', async () => {
      const id = 2;
      const updateRequest: UpdateUserByAdminRequest = {
        height: -1,
        weight: 100,
        weightInYouth: -1,
        heartDesease: 'heart shortage',
        canWatchVideo: true,
        anthrpJobPeriod: 1,
      };
      expect(service.updateUser(id, updateRequest)).rejects.toThrow();
    });
  });
});
