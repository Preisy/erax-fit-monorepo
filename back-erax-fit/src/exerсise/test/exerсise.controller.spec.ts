import { Test, TestingModule } from '@nestjs/testing';
import { ExerсiseController } from '../exerсise.controller';

describe('ExerсiseController', () => {
  let controller: ExerсiseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExerсiseController],
    }).compile();

    controller = module.get<ExerсiseController>(ExerсiseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
