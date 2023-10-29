import { Injectable } from '@nestjs/common';
import { CreateUserByAdminRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { BaseUserService } from './base-user.service';
import { AppPagination } from '../../utils/app-pagination.util';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class AdminService {
  constructor(private readonly baseService: BaseUserService) {}

  async create(request: CreateUserByAdminRequest) {
    const { data: savedUser } = await this.baseService.create(request);

    return new AppSingleResponse(savedUser);
  }

  async getUsers(request: AppPagination.Request) {
    return this.baseService.getUsers(request);
  }

  async getUserByEmail(email: UserEntity['email']) {
    return this.baseService.getUserByEmail(email);
  }

  async getUserById(id: UserEntity['id']) {
    return this.baseService.getUserById(id);
  }

  async updateUser(request: UpdateUserRequest) {
    return this.baseService.updateUser(request);
  }

  async deleteUserById(id: UserEntity['id']) {
    return this.baseService.deleteUserById(id);
  }
}
