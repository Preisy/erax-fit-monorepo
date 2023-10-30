import { InjectRepository } from '@nestjs/typeorm';
import { AntropometricsEntity } from './entities/antropometrics.entity';
import { Repository } from 'typeorm';
import { CreateAntropometricsRequest } from './dto/create-antropometrics.dto';
import { AppSingleResponse } from '../../../dto/app-single-response.dto';
import { AppPagination } from '../../../utils/app-pagination.util';
import { AppStatusResponse } from '../../../dto/app-status-response.dto';
import { UpdateAntropometricsRequest } from './dto/update-antropometrics';
import { MainException } from '../../../exceptions/main.exception';
import { filterUndefined } from '../../../utils/filter-undefined.util';
import { UserEntity } from '../user/entities/user.entity';

export class BaseAntropometrcisService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public readonly relation = ['antropometrics'];

  async create(request: CreateAntropometricsRequest): Promise<AppSingleResponse<AntropometricsEntity>> {
    const savedAntrp = await this.antrpRepository.save(
      await this.antrpRepository.create({
        ...request,
      }),
    );

    if (!savedAntrp) throw MainException.internalRequestError('Error upon saving antropometrics');

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

  async getAntropometricsByDateRange(
    userId: UserEntity['id'],
    startDate: Date,
    endDate: Date,
  ): Promise<AntropometricsEntity[]> {
    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
      relations: this.relation,
    });

    if (!user) throw MainException.entityNotFound(`User with id ${userId} not found`);

    return user.antropometrics
      .filter((antrp) => antrp.createdAt >= startDate && antrp.createdAt <= endDate)
      .sort((antrpEnd, antrpStart) => antrpEnd.createdAt.getTime() - antrpStart.createdAt.getTime());
  }

  async update(
    id: UserEntity['id'],
    request: UpdateAntropometricsRequest,
  ): Promise<AppSingleResponse<AntropometricsEntity>> {
    const { data: antrp } = await this.getById(request.id || 0);

    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: this.relation,
    });

    const savedAntrp = await this.antrpRepository.save({
      ...antrp,
      ...filterUndefined(request),
    });

    if (!savedAntrp) throw MainException.internalRequestError('Error upon saving antropometrics');
    if (!user) throw MainException.entityNotFound(`User with id ${antrp.userId} not found`);

    user.antropometrics.push(savedAntrp);
    await this.userRepository.save(user);

    return new AppSingleResponse(savedAntrp);
  }

  async delete(id: AntropometricsEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.antrpRepository.delete(id);

    return new AppStatusResponse(!!affected);
  }
}
