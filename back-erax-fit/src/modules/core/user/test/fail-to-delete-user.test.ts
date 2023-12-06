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

  describe('deleteUserById method', () => {
    it('should delete an user record by its ID', async () => {
      const id = 30;
      expect(service.deleteUserById(id)).rejects.toThrow();
    });
  });
});
