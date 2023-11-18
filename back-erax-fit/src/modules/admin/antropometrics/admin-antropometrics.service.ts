import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { UserEntity } from '../../../modules/core/user/entities/user.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SchedulerRegistry } from '@nestjs/schedule';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';

@Injectable()
export class AdminAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    private readonly baseService: BaseAntropometrcisService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  public readonly relations: (keyof AntropometricsEntity)[] = ['user'];

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<AntropometricsEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: AntropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }

  async saveAntropometricsToDb(userId: UserEntity['id']) {
    const antrp = this.antrpRepository.findOne({
      where: {
        createdAt: new Date(),
        userId,
      },
      relations: this.relations,
    });
    if (!antrp) await this.antrpRepository.save(new AntropometricsEntity());
  }

  private async setCronJob(user: UserEntity): Promise<AppStatusResponse> {
    const callback = () => this.saveAntropometricsToDb(user.id);

    const newTimeout = setTimeout(callback, 24 * 60 * 60 * 1000);

    this.schedulerRegistry.addTimeout(`${user.taskName}`, newTimeout);
    return new AppStatusResponse(true);
  }

  async updateCron(user: UserEntity, taskName: string, taskPeriod: number): Promise<AppStatusResponse> {
    try {
      const timeout = this.schedulerRegistry.getTimeout(`${user.taskName}`);
      clearTimeout(timeout);
    } catch {
      await this.setCronJob(user);
    }

    const callback = () => this.saveAntropometricsToDb(user.id);

    const newTimeout = setTimeout(callback, taskPeriod * 24 * 60 * 60 * 1000);
    this.schedulerRegistry.addTimeout(taskName, newTimeout);

    return new AppStatusResponse(true);
  }
}
