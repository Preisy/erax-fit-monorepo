import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { GetAntropometricsByAdminRequest } from './dto/admin-get-antropometrics.dto';

@Injectable()
export class AdminAntropometricsService {
  constructor(private readonly baseService: BaseAntropometrcisService) {}

  async findAll(query: AppPagination.Request): Promise<AppPagination.Response<AntropometricsEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: AntropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }

  async findAntropometricsByDateRange(userId: UserEntity['id'], request: GetAntropometricsByAdminRequest) {
    return this.baseService.findAntropometricsByDateRange(userId, request);
  }
}
