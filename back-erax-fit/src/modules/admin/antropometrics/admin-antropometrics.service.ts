import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from '../../core/antropometrics/base-antropometrics.service';
import { AntropometricsEntity } from '../../core/antropometrics/entities/antropometrics.entity';
import { AppDatePagination } from '../../../utils/app-date-pagination.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cron, CronExpression } from '@nestjs/schedule';
import { BaseUserService } from '../../../modules/core/user/base-user.service';
import { AppPagination } from '../../../utils/app-pagination.util';
import { UserRole } from '../../../constants/constants';
import { CreateAnthropometricsByAdminRequest } from './dto/create-anthropometrics-by-admin.dto';

@Injectable()
export class AdminAntropometricsService {
  constructor(
    @InjectRepository(AntropometricsEntity)
    private readonly antrpRepository: Repository<AntropometricsEntity>,
    private readonly baseService: BaseAntropometrcisService,
    private readonly userService: BaseUserService,
  ) {}

  public readonly relations: (keyof AntropometricsEntity)[] = ['user'];

  async create(request: CreateAnthropometricsByAdminRequest) {
    return this.baseService.create(request);
  }

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<AntropometricsEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: AntropometricsEntity['id']) {
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
      {} as Record<number, AntropometricsEntity>,
    );

    users.forEach((user) => {
      const userAnthrp = anthrpMap[user.id];
      user.taskPeriod;
      userAnthrp.createdAt;
      if (Math.abs(userAnthrp.createdAt.getTime() - new Date().getTime()) >= user.taskPeriod! * 1000 * 60 * 60 * 24) {
        this.antrpRepository.save(new AntropometricsEntity());
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
