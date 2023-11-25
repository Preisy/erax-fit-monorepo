import { Injectable } from '@nestjs/common';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseSelfControlService } from 'src/modules/core/self-control/base-self-control.service';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { UserEntity } from 'src/modules/core/user/entities/user.entity';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { UpdateSelfControlByAdminRequest } from './dto/admin-update-self-control.dto';

@Injectable()
export class AdminSelfControlService {
  constructor(private readonly baseService: BaseSelfControlService) {}
  async create(user: UserEntity): Promise<AppSingleResponse<SelfControlEntity>> {
    return this.baseService.create(user);
  }

  private async setCronJob(user: UserEntity): Promise<AppStatusResponse> {
    const callback = () => this.create(user);

    const defaultTimeout = setTimeout(callback, 24 * 60 * 60 * 1000);

    this.schedulerRegistry.addTimeout(`${user.selfControlTaskName}`, defaultTimeout);
    return new AppStatusResponse(true);
  }

  async findAll(query: AppDatePagination.Request): Promise<AppDatePagination.Response<SelfControlEntity>> {
    return this.baseService.findAll(query);
  }

  async findOne(id: SelfControlEntity['id']) {
    return this.baseService.findOne(id);
  }

  async update(id: SelfControlEntity['id'], request: UpdateSelfControlByAdminRequest) {
    return this.baseService.update(id, request);
  }

  async deleteOne(id: SelfControlEntity['id']): Promise<AppStatusResponse> {
    return this.baseService.deleteOne(id);
  }
}
