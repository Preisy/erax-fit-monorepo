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
import { AppDatePagination } from '../../../utils/app-date-pagination.util';

@Injectable()
export class BaseAntropometrcisService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
  ) {}

  public readonly relations = ['user'];

  async create(
    user: UserEntity,
    request: CreateAntropometricsRequest,
  ): Promise<AppSingleResponse<AntropometricsEntity>> {
    const newAntrp = await this.antrpRepository.create({
      ...request,
      userId: user.id,
    });

    const savedAntrp = await this.antrpRepository.save(newAntrp);

    return new AppSingleResponse(savedAntrp);
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

  async delete(id: AntropometricsEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.antrpRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
