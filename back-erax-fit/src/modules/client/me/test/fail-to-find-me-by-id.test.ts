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
    it('should not find user record because of wrong id', async () => {
      const id = 10000;
      expect(service.getMe(id)).rejects.toThrow();
    });
  });
});
