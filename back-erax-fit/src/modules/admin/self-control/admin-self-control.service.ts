import { Injectable } from '@nestjs/common';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { BaseSelfControlService } from 'src/modules/core/self-control/base-self-control.service';
import { SelfControlEntity } from 'src/modules/core/self-control/entity/self-control.entity';
import { AppDatePagination } from 'src/utils/app-date-pagination.util';
import { CreateWorkoutByAdminRequest } from './dto/admin-create-wrokout.dto';
import { UpdateSelfControlByAdminRequest } from './dto/admin-update-self-control.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class AdminSelfControlService {
  constructor(private readonly baseService: BaseSelfControlService) {}
  @Cron()
  async create(request: CreateWorkoutByAdminRequest): Promise<AppSingleResponse<SelfControlEntity>> {
    return this.baseService.create(request);
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
