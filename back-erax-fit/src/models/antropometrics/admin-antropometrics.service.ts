import { Injectable } from '@nestjs/common/decorators';
import { BaseAntropometrcisService } from './core/base-antropometrics.service';
import { AdminService } from '../user/admin.service';
import { CreateAntropometricsByAdminRequest } from './dto/create-antropometrics.dto';
import { UserRole } from '../../constants/constants';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { AppPagination } from '../../utils/app-pagination.util';
import { AntropometricsEntity } from './entities/antropometrics.entity';
import { UpdateAntropometricsRequest } from './dto/update-antropometrics';

@Injectable()
export class AdminAntropometricsService {
  constructor(
    private readonly baseService: BaseAntropometrcisService,
    private readonly adminService: AdminService,
  ) {}

  async create(request: CreateAntropometricsByAdminRequest) {
    const { user } =
      request.role === UserRole.Admin ? await this.adminService.getUserById(request.userId) : { user: undefined };
    const { data: savedAntrp } = await this.baseService.create(request);

    if (user) {
      user.antropometrics.push(savedAntrp);
      await this.adminService.updateUser(user);
    }
    return new AppSingleResponse(savedAntrp);
  }

  async getAll(query: AppPagination.Request) {
    return this.baseService.getAll(query);
  }

  async getById(id: AntropometricsEntity['id']) {
    return this.baseService.getById(id);
  }

  async update(request: UpdateAntropometricsRequest) {
    return this.baseService.update(request);
  }

  async delete(id: AntropometricsEntity['id']) {
    return this.baseService.delete(id);
  }
}
