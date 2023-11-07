import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { AppDatePagination } from '../../../utils/app-pagination-date.util';

@Injectable()
export class AdminAntropometricsService {
  constructor(private readonly baseService: BaseAntropometrcisService) {}

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<AntropometricsEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: AntropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }

  async updateCron(previousTask: string, nextTask: string, userId: UserEntity['id'], day: number) {
    return await this.baseService.updateCron(previousTask, nextTask, userId, day);
  }
}
