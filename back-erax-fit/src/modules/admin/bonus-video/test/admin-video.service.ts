import { Test, TestingModule } from '@nestjs/testing';
import { AdminBonusVideoService } from '../admin-bonus-video.service';
import { BonusVideoEntity } from '../../../core/bonus-video/entities/bonus-video.entity';
import { CreateVideoByAdminRequest } from '../dto/admin-create-video.dto';
import { AppSingleResponse } from '../../../../dto/app-single-response.dto';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseBonusVideoService } from '../../../core/bonus-video/base-bonus-video.service';

describe('AdminBonusVideoService', () => {
  let service: AdminBonusVideoService;
  let repository: Repository<BonusVideoEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AdminBonusVideoService,
        {
          provide: getRepositoryToken(BonusVideoEntity),
          useClass: Repository,
        },
        BaseBonusVideoService,
      ],
    }).compile();

    service = module.get<AdminBonusVideoService>(AdminBonusVideoService);
    repository = module.get<Repository<BonusVideoEntity>>(getRepositoryToken(BonusVideoEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new bonus video', async () => {
      const createVideoRequest: CreateVideoByAdminRequest = {
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
