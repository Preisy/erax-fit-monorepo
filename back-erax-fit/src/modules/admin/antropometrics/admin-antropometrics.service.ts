import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';

@Injectable()
export class AdminAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly baseService: BaseAntropometrcisService,
  ) {}

  async getAll(query: AppPagination.Request) {
    return this.baseService.getAll(query);
  }

  async getById(id: AntropometricsEntity['id']) {
    return this.baseService.getById(id);
  }

  async getAntropometricsByDateRange(userId: UserEntity['id'], startDate: Date, endDate: Date) {
    return this.baseService.getAntropometricsByDateRange(userId, startDate, endDate);
  }
}
