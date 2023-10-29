import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { BaseUserService } from './core/base-user.service';
import { CreateClientRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { Injectable } from '@nestjs/common/decorators';

@Injectable()
export class ClientService {
  constructor(private readonly baseService: BaseUserService) {}

  async create(request: CreateClientRequest) {
    const { data: savedUser } = await this.baseService.create(request);

    return new AppSingleResponse(savedUser);
  }

  async getUserByEmail(email: UserEntity['email']) {
    return this.baseService.getUserByEmail(email);
  }

  async getUserById(id: UserEntity['id']) {
    return this.baseService.getUserById(id);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserRequest) {
    return this.baseService.updateUser(id, request);
  }
}
