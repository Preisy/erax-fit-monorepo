import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { GetAntropometricsRequest } from 'src/modules/core/antropometrics/dto/get-antropometrics';

@Injectable()
export class AdminAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly baseService: BaseAntropometrcisService,
  ) {}

  async findAll(query: AppPagination.Request) {
    return this.baseService.findAll(query);
  }

  async findById(id: AntropometricsEntity['id']) {
    return this.baseService.findOne(id);
  }

  async findAntropometricsByDateRange(userId: UserEntity['id'], request: GetAntropometricsRequest) {
    return this.baseService.findAntropometricsByDateRange(userId, request);
  }
}
