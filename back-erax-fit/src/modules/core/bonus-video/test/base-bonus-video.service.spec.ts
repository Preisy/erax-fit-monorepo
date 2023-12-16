import { Test, TestingModule } from '@nestjs/testing';
import { BaseBonusVideoService } from '../base-bonus-video.service';
import { BonusVideoEntity } from '../entities/bonus-video.entity';
import { CreateVideoRequest } from '../dto/create-video.dto';
import { AppSingleResponse } from '../../../../dto/app-single-response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

describe('BaseBonusVideoService', () => {
  let service: BaseBonusVideoService;
  let repository: Repository<BonusVideoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BaseBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<BaseBonusVideoService>(BaseBonusVideoService);
    repository = module.get<Repository<BonusVideoEntity>>(getRepositoryToken(BonusVideoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bonus video', async () => {
      const createVideoRequest: CreateVideoRequest = {
        name: 'porn migration video',
        linkUrl: 'undefined/porn.mp4',
      };
      jest.spyOn(repository, 'save').mockResolvedValueOnce(createVideoRequest as BonusVideoEntity);
      const result = await service.create(createVideoRequest);
      expect(result).toBeInstanceOf(AppSingleResponse);
      expect(result.data).toEqual(createVideoRequest);
    });
  });

  describe('findOne', () => {
    it('should find a bonus video by id', async () => {
      const id = 1;
      const video = await service.findOne(id);
      expect(video).toBeDefined();
      expect({ data: video }).toBe(id);
      expect({ data: video.data }).toBeDefined();
    });
  });

  describe('delete', () => {
    it('should delete a bonus video by id', async () => {
      const id = 1;
      const affected = await service.delete(id);
      expect(affected).toBeDefined();
      expect(affected).toBe(1);
    });
  });
});
