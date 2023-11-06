import { InjectRepository } from '@nestjs/typeorm';
import { AntropometricsEntity } from './entities/antropometrics.entity';
import { Repository } from 'typeorm';
import { CreateAntropometricsRequest } from './dto/create-antropometrics.dto';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAntropometricsRequest } from './dto/update-antropometrics';
import { MainException } from '../../../exceptions/main.exception';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { UserEntity } from '../user/entities/user.entity';
import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/constants/constants';
import { Timeout } from '@nestjs/schedule';
import { AppDatePagination } from '../../../utils/app-pagination-date.util';
import { SchedulerRegistry } from '@nestjs/schedule';

@Injectable()
export class BaseAntropometrcisService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  public readonly relations = ['user'];

  async create(
    user: UserEntity,
    request: CreateAntropometricsRequest,
  ): Promise<AppSingleResponse<AntropometricsEntity>> {
    if (user.role != UserRole.Client) throw MainException.forbidden('Forbidden');

    const newAntrp = await this.antrpRepository.create({
      ...request,
      userId: user.id,
    });

    const savedAntrp = await this.antrpRepository.save(newAntrp);

    return new AppSingleResponse(savedAntrp);
  }

  @Timeout('antropometricsTask', 86_400_000)
  async saveAntropometricsToDb(userId: UserEntity['id']) {
    const antrp = this.antrpRepository.findOne({
      where: {
        createdAt: new Date(),
      },
      relations: this.relations,
    });
    if (!antrp) await this.antrpRepository.save(new AntropometricsEntity());
  }

  async findAll(
    query: AppDatePagination.Request,
    options?: AppDatePagination.GetExecutorOptions<AntropometricsEntity>,
  ): Promise<AppDatePagination.Response<AntropometricsEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.antrpRepository, this.relations);
    return getPaginatedData(query, options);
  }

  async findOne(id: AntropometricsEntity['id']) {
    const antrp = await this.antrpRepository.findOne({
      where: { id },
      relations: this.relations,
    });

    if (!antrp) throw MainException.entityNotFound(`Antropometrics with id ${id} not found`);

    return new AppSingleResponse(antrp);
  }

  async update(
    id: AntropometricsEntity['id'],
    request: UpdateAntropometricsRequest,
  ): Promise<AppSingleResponse<AntropometricsEntity>> {
    const { data: antrp } = await this.findOne(id);

    const savedAntrp = await this.antrpRepository.save({
      ...antrp,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedAntrp);
  }

  async updateCron(
    previousTask: string,
    nextTask: string,
    userId: UserEntity['id'],
    day: number,
  ): Promise<AppStatusResponse> {
    const timeout = this.schedulerRegistry.getTimeout(previousTask);
    clearTimeout(timeout);

    const callback = () => {
      this.saveAntropometricsToDb(userId);
    };

    const schedule = day * 24 * 60 * 60 * 1000;

    const newTimeout = setTimeout(callback, schedule);
    this.schedulerRegistry.addTimeout(nextTask, newTimeout);

    return new AppStatusResponse(true);
  }

  async delete(id: AntropometricsEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.antrpRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
