import { Injectable } from '@nestjs/common/decorators';
import { Cron } from '@nestjs/schedule';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { createAntropometricsByMeRequest } from './dto/create-antropometrics-by-me.dto';
import { UpdateAntropometricsByMeRequest } from './dto/update-antropometrics-by-me.dto';
import { BaseAntropometrcisService } from 'src/modules/core/antropometrics/base-antropometrics.service';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { MeService } from '../me/me.service';

@Injectable()
export class MeAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    private readonly baseService: BaseAntropometrcisService,
    private readonly meService: MeService,
  ) {}

  async create(id: UserEntity['id'], request: createAntropometricsByMeRequest, status: boolean) {
    if (!status) return this.sendDataToDb(request);

    const { data: savedAntrp } = await this.baseService.create(request);

    const { data: user } = await this.meService.getUserById(id);
    user.antropometrics.push(savedAntrp);
    await this.meService.updateUser(id, user);

    return new AppSingleResponse(savedAntrp);
  }

  @Cron('30 1 * * * *')
  async sendDataToDb(data: AntropometricsEntity) {
    const savedData = await this.antrpRepository.save({
      ...data,
    });
    return new AppSingleResponse(savedData);
  }

  async getById(id: AntropometricsEntity['id']) {
    return this.baseService.getById(id);
  }

  async update(id: UserEntity['id'], request: UpdateAntropometricsByMeRequest) {
    return this.baseService.update(id, request);
  }

  async delete(id: AntropometricsEntity['id']) {
    return this.baseService.delete(id);
  }
}
