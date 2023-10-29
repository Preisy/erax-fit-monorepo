import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { BaseUserService } from './base-user.service';
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
    await this.baseService.getUserById(id);
  }

  async updateUser(request: UpdateUserRequest) {
    return this.baseService.updateUser(request);
  }

  async deleteUserById(id: UserEntity['id']) {
    return this.baseService.deleteUserById(id);
  }
}
