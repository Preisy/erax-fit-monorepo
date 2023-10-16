import { Test, TestingModule } from '@nestjs/testing';
import { ExerсiseService } from '../exerсise.service';

describe('ExerсiseService', () => {
  let service: ExerсiseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerсiseService],
    }).compile();

    service = module.get<ExerсiseService>(ExerсiseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
