import { Injectable } from '@nestjs/common/decorators';
import { BaseAnthropometrcisService } from '../../core/anthropometrics/base-anthropometrics.service';
import { AnthropometricsEntity } from '../../core/anthropometrics/entities/anthropometrics.entity';
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
    private readonly anthrpRepository: Repository<AnthropometricsEntity>,
    private readonly baseService: BaseAnthropometrcisService,
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

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createAnthropometricsCron() {
    const { data: users } = await this.userService.getUsers(new AppPagination.Request(), {
      where: {
        role: UserRole.Client,
      },
    });

    const data = await this.findLatestAnthropometricsForEachUser();
    const anthrpMap = data.reduce(
      (acc, value) => ({ ...acc, [value.userId]: value }),
      {} as Record<number, AnthropometricsEntity>,
    );

    users.forEach((user) => {
      const userAnthrp = anthrpMap[user.id];
      user.anthrpJobPeriod;
      const anthrpCreatedAt = userAnthrp.createdAt.getTime() || 0;
      if (Math.abs(anthrpCreatedAt - new Date().getTime()) >= user.anthrpJobPeriod! * 1000 * 60 * 60 * 24) {
        this.anthrpRepository.save(this.anthrpRepository.create({ userId: user.id }));
      }
    });
  }

  async findLatestAnthropometricsForEachUser() {
    const subQuery = await this.anthrpRepository
      .createQueryBuilder('sub')
      .select('MAX(sub.createdAt)', 'maxCreatedAt')
      .where('sub.userId = main.userId')
      .groupBy('sub.userId');

    const latestAnthrp = await this.anthrpRepository
      .createQueryBuilder('main')
      .where(`main.createdAt = (${subQuery.getQuery()})`)
      .getMany();

    return latestAnthrp;
  }
}
