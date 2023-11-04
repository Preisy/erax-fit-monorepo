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
import { GetAntropometricsRequest } from './dto/get-antropometrics.dto';
import { Injectable } from '@nestjs/common';
import { BaseUserService } from '../user/base-user.service';

@Injectable()
export class BaseAntropometrcisService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly userService: BaseUserService,
  ) {}

  public readonly relations = ['user'];

  async create(
    userId: UserEntity['id'],
    request: CreateAntropometricsRequest,
  ): Promise<AppSingleResponse<AntropometricsEntity>> {
    const newAntrp = await this.antrpRepository.create({
      ...request,
      userId: userId,
    });
    const { data: user } = await this.userService.getUserById(userId);

    if (!user.antropometrics) user.antropometrics = [];
    user.antropometrics.push(newAntrp);
    await this.userRepository.save(user);

    const savedAntrp = await this.antrpRepository.save(newAntrp);

    return new AppSingleResponse(savedAntrp);
  }

  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<AntropometricsEntity>,
  ): Promise<AppPagination.Response<AntropometricsEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.antrpRepository, this.relations);
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

  async findAntropometricsByDateRange(
    userId: UserEntity['id'],
    request: GetAntropometricsRequest,
  ): Promise<AntropometricsEntity[]> {
    const antrps = await this.antrpRepository
      .createQueryBuilder('antropometrics')
      .where('antropometrics.userId = :userId', { userId: userId })
      .andWhere('antropometrics.createdAt >= :startDate', { startDate: request.startDate })
      .andWhere('antropometrics.createdAt <= :endDate', { endDate: request.endDate })
      .orderBy('antropometrics.createdAt', 'ASC')
      .getMany();
    return antrps;
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
