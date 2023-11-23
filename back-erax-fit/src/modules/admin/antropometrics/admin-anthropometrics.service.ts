import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-anthropometrics.service';
import { AnthropometricsEntity } from '../../core/antropometrics/entities/anthropometrics.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BaseUserService } from '../../core/user/base-user.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserRole } from '../../../constants/constants';
import { CreateAnthropometricsByAdminRequest } from './dto/create-anthropometrics-by-admin.dto';

@Injectable()
export class AdminAnthropometricsService {
  constructor(
    @InjectRepository(AnthropometricsEntity)
    private readonly antrpRepository: Repository<AnthropometricsEntity>,
    private readonly baseService: BaseAntropometrcisService,
    private readonly userService: BaseUserService,
  ) {}

  public readonly relations: (keyof AnthropometricsEntity)[] = ['user'];

  async create(request: CreateAnthropometricsByAdminRequest) {
    return this.baseService.create(request);
  }

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<AnthropometricsEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: AnthropometricsEntity['id']) {
    return await this.baseService.findOne(id);
  }

  @Cron(CronExpression.EVERY_MINUTE)
  async createAnthropometricsCron() {
    const { data: users } = await this.userService.getUsers(new AppPagination.Request(), {
      where: {
        role: UserRole.Client,
      },
    });

    const data = await this.findLatestEntitiesForEachUser();
    const anthrpMap = data.reduce(
      (acc, value) => ({ ...acc, [value.id]: value }),
      {} as Record<number, AnthropometricsEntity>,
    );

    users.forEach((user) => {
      const userAnthrp = anthrpMap[user.id];
      user.anthrpJobPeriod;
      userAnthrp.createdAt;
      if (
        Math.abs(userAnthrp.createdAt.getTime() - new Date().getTime()) >=
        user.anthrpJobPeriod! * 1000 * 60 * 60 * 24
      ) {
        this.antrpRepository.save(new AnthropometricsEntity());
      }
    });
  }

  async findLatestEntitiesForEachUser() {
    const subQuery = await this.antrpRepository
      .createQueryBuilder('sub')
      .select('MAX(sub.createdAt)', 'maxCreatedAt')
      .where('sub.userId = main.userId')
      .groupBy('sub.userId');

    const latestEntities = await this.antrpRepository
      .createQueryBuilder('main')
      .where(`main.createdAt = (${subQuery.getQuery()})`)
      .getMany();

    return latestEntities;
  }
}
