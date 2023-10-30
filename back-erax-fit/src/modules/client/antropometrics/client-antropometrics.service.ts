import { Injectable } from '@nestjs/common/decorators';
import { Cron } from '@nestjs/schedule';
import { AntropometricsEntity } from '../../../modules/core/antropometrics/entities/antropometrics.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';

@Injectable()
export class ClientAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
  ) {}

  @Cron('30 1 * * * *')
  async sendDataToDb(data: AntropometricsEntity) {
    const savedData = await this.antrpRepository.save({
      ...data,
    });
    return new AppSingleResponse(savedData);
  }
}
