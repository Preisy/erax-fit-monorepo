import { Injectable } from '@nestjs/common/decorators';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { CreateAntropometricsByClientRequest } from './dto/client-create-antropometrics.dto';
import { UpdateAntropometricsByClientRequest } from './dto/client-update-antropometrics.dto';
import { BaseAntropometrcisService } from '../../../modules/core/antropometrics/base-antropometrics.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppDatePagination } from 'src/utils/app-pagination-date.util';

@Injectable()
export class ClientAntropometricsService {
  constructor(private readonly baseService: BaseAntropometrcisService) {}

  async create(user: UserEntity, request: CreateAntropometricsByClientRequest) {
    return this.baseService.create(user, request);
  }

  async findAll(
    user: UserEntity,
    query: AppDatePagination.Request,
  ): Promise<AppDatePagination.Response<AntropometricsEntity>> {
    return this.baseService.findAll(query, { where: { userId: user.id } });
  }

  async findOne(id: AntropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }

  async update(id: AntropometricsEntity['id'], request: UpdateAntropometricsByClientRequest) {
    return this.baseService.update(id, request);
  }

  async delete(id: AntropometricsEntity['id']) {
    return this.baseService.delete(id);
  }
}
