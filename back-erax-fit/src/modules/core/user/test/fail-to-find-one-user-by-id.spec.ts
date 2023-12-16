import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';

describe('BaseUserService', () => {
  let service: BaseUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseUserService],
    }).compile();
    service = module.get<BaseUserService>(BaseUserService);
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
