import { Injectable } from '@nestjs/common/decorators';
import { Cron } from '@nestjs/schedule';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { CreateAntropometricsByClientRequest } from './dto/create-antropometrics-by-client.dto';
import { UpdateAntropometricsByClientRequest } from './dto/update-antropometrics-by-client.dto';
import { BaseAntropometrcisService } from '../../../modules/core/antropometrics/base-antropometrics.service';
import { UserEntity } from '../../core/user/entities/user.entity';
import { AppPagination } from '../../../utils/app-pagination.util';

@Injectable()
export class ClientAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    private readonly baseService: BaseAntropometrcisService,
  ) {}

  async create(userId: UserEntity['id'], request: CreateAntropometricsByClientRequest) {
    if (!request.status) return this.sendDataToDb(request);

    return this.baseService.create(userId, request);
  }

  @Cron('30 1 * * * *')
  async sendDataToDb(data: CreateAntropometricsByClientRequest) {
    const savedData = await this.antrpRepository.save({
      ...data,
    });
    return new AppSingleResponse(savedData);
  }

  async findAll(
    userId: AntropometricsEntity['userId'],
    query: AppPagination.Request,
  ): Promise<AppPagination.Response<AntropometricsEntity>> {
    return this.baseService.findAll(query, {
      where: {
        userId,
      },
    });
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