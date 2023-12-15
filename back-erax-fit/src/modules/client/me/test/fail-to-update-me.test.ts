import { Test, TestingModule } from '@nestjs/testing';
import { MeService } from '../me.service';
import { UpdateUserByClientRequest } from '../dto/update-client-user.dto';

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

  describe('updateUser method', () => {
    it('should not update an existing user record because of wrong id', async () => {
      const id = 20;
      const updateRequest: UpdateUserByClientRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
      };
      expect(service.updateUser(id, updateRequest)).rejects.toThrow();
    });
  });

  describe('updateUser method', () => {
    it('should not update an existing user record because of numeric fields', async () => {
      const id = 2;
      const updateRequest: UpdateUserByClientRequest = {
        height: -1,
        weight: 100,
        weightInYouth: -1,
        heartDesease: 'heart shortage',
      };
      expect(service.updateUser(id, updateRequest)).rejects.toThrow();
    });
  });
});
