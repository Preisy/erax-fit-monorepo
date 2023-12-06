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

  describe('update method', () => {
    it('should update an existing user record', async () => {
      const id = 2;
      const updateRequest: UpdateUserByClientRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
      };
      const savedUser = await service.updateUser(id, updateRequest);
      expect(savedUser).toBeDefined();
      expect({ data: savedUser }).toBe(id);
      expect({ data: savedUser.data }).toBeDefined();
    });
  });
});
