import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { MainException } from 'src/exceptions/main.exception';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { Repository } from 'typeorm';
import { BaseDiaryTemplateService } from '../diary-template/base-diary-template.service';
import { UserEntity } from '../user/entities/user.entity';
import { BaseWorkoutService } from '../workout/base-workout.service';
import { GetSelfControlDTO } from './dto/get-self-control.dto';
import { UpdateSelfControlRequest } from './dto/update-self-control.dto';
import { SelfControlEntity } from './entity/self-control.entity';

@Injectable()
export class BaseSelfControlService {
  constructor(
    @InjectRepository(SelfControlEntity)
    private readonly selfControlRepository: Repository<SelfControlEntity>,
    private readonly workoutService: BaseWorkoutService,
    private readonly diaryTemplateService: BaseDiaryTemplateService,
  ) {}
  public readonly relations: (keyof SelfControlEntity)[] = ['user', 'props'];

  async create(user: UserEntity): Promise<AppSingleResponse<SelfControlEntity>> {
    const newSelfControl = this.selfControlRepository.create({
      userId: user.id,
      templateId: user.templateId,
    });

    const { data: template } = await this.diaryTemplateService.findOne(user.templateId);
    newSelfControl.props = template.props;

    const newDate = new Date(Date.now());
    newDate.setHours(0, 0, 0, 0);
    newSelfControl.date = newDate;

    try {
      const { data: workout } = await this.workoutService.findOneByDate(newDate);
      newSelfControl.behavior = `Цикл ${workout.loop}`;
    } catch (e) {
      newSelfControl.behavior = 'Отдых';
    }
    const savedSelfControl = await this.selfControlRepository.save(newSelfControl);

    return new AppSingleResponse<GetSelfControlDTO>(this.getSelfControlDTO(savedSelfControl));
  }

  async findAll(
    query: AppDatePagination.Request,
    options?: AppDatePagination.GetExecutorOptions<SelfControlEntity>,
  ): Promise<AppDatePagination.Response<SelfControlEntity>> {
    const { getPaginatedData } = AppDatePagination.getExecutor(this.selfControlRepository, this.relations);
    return getPaginatedData(query, options);
  }

  async findOne(id: SelfControlEntity['id']) {
    const selfControl = await this.selfControlRepository.findOne({
      where: {
        id,
      },
      relations: this.relations,
    });

    if (!selfControl) {
      throw MainException.entityNotFound(`Self control with id: ${id} not found`);
    }
    return new AppSingleResponse<GetSelfControlDTO>(this.getSelfControlDTO(selfControl));
  }

  async update(id: SelfControlEntity['id'], request: UpdateSelfControlRequest) {
    const { data: selfControl } = await this.findOne(id);
    if (request.props) {
      selfControl.props = [];
    }
    const savedSelfControl = await this.selfControlRepository.save({
      ...selfControl,
      ...filterUndefined(request),
    });
    return new AppSingleResponse<GetSelfControlDTO>(this.getSelfControlDTO(savedSelfControl));
  }

  async deleteOne(id: SelfControlEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.selfControlRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  private getSelfControlDTO(selfControl: SelfControlEntity) {
    return {
      ...selfControl,
      localeDate: selfControl.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    };
  }
}
