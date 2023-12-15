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

  describe('getUserByEmail method', () => {
    it('should not find user record because of wrong email', async () => {
      const email = 'sdfghjkl';
      expect(service.getUserByEmail(email)).rejects.toThrow();
    });
  });

  describe('getUserByEmail method', () => {
    it('should not find user record because given email does not exist', async () => {
      const email = 'a5@mail.ru';
      expect(service.getUserByEmail(email)).rejects.toThrow();
    });
  });
});
