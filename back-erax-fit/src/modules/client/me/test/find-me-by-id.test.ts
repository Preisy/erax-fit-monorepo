import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from '../me.service';

describe('MeService', () => {
  let service: MeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MeService],
    }).compile();
    service = module.get<MeService>(MeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMe method', () => {
    it('should find user record by its ID', async () => {
      const id = 1;
      const user = await service.getMe(id);
      expect(user).toBeDefined();
      expect({ data: user }).toBe(id);
      expect({ data: user.data }).toBeDefined();
    });
  });
});
