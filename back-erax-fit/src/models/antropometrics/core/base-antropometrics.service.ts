import { InjectRepository } from '@nestjs/typeorm';
import { AntropometricsEntity } from '../entities/antropometrics.entity';
import { Repository } from 'typeorm';
import { CreateAntropometricsRequest } from '../dto/create-antropometrics.dto';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAntropometricsRequest } from '../dto/update-antropometrics';
import { MainException } from '../../../exceptions/main.exception';
import { filterUndefined } from '../../../utils/filter-undefined.util';

export class BaseAntropometrcisService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
  ) {}

  async create(request: CreateAntropometricsRequest): Promise<AppSingleResponse<AntropometricsEntity>> {
    const savedAntrp = await this.antrpRepository.save(
      await this.antrpRepository.create({
        ...request,
      }),
    );
    return new AppSingleResponse(savedAntrp);
  }

  async getAll(query: AppPagination.Request): Promise<AppPagination.Response<AntropometricsEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.antrpRepository);
    return getPaginatedData(query);
  }

  async getById(id: AntropometricsEntity['id']): Promise<AppSingleResponse<AntropometricsEntity>> {
    const antrp = await this.antrpRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!antrp) throw MainException.entityNotFound(`Antropometrcis with id ${id} not found`);

    return new AppSingleResponse(antrp);
  }

  async update(request: UpdateAntropometricsRequest): Promise<AppSingleResponse<AntropometricsEntity>> {
    const { data: antrp } = await this.getById(request.id);

    const savedAntrp = await this.antrpRepository.save({
      ...antrp,
      ...filterUndefined(request),
    });

    if (!savedAntrp) throw MainException.internalRequestError('Error upon saving antropometrics');

    return new AppSingleResponse(savedAntrp);
  }

  async delete(id: AntropometricsEntity['id']): Promise<AppStatusResponse> {
    const result = await this.antrpRepository.delete(id);

    return new AppStatusResponse(result.affected > 0);
  }
}
