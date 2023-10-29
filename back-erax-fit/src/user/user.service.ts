import { Injectable } from '@nestjs/common';
import { CreateUserByAdminRequest, CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { MainException } from '../exceptions/main.exception';
import { UserRole } from '../constants/constants';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { AppPagination } from 'src/utils/app-pagination.util';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    console.log();
  }

  async createUser(request: CreateUserRequest | CreateUserByAdminRequest): Promise<AppSingleResponse<UserEntity>> {
    await this.checkEmailForExistAndThrowErrorIfExist(request.email);

    const newUser = this.userRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, await bcrypt.genSalt(10)),
      firstName: request.firstName,
      lastName: request.lastName,
      role: request instanceof CreateUserByAdminRequest ? request.role : UserRole.Client,
    });

    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async getAll(query: AppPagination.Request): Promise<AppPagination.Response<UserEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.userRepository);
    return getPaginatedData(query);
  }

  async getUserByEmail(email: string): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['token'],
    });

    if (!user) throw MainException.entityNotFound(`User with email: ${email} not found`);

    return new AppSingleResponse(user);
  }

  async getUserById(id: UserEntity['id']): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
      relations: ['token'],
    });

    if (!user) throw MainException.entityNotFound(`User with id ${id} not found`);

    return new AppSingleResponse(user);
  }

  async updateUser(request: UpdateUserRequest): Promise<AppSingleResponse<UserEntity>> {
    const { data: user } = await this.getUserById(request.id);

    if (request.email) {
      try {
        await this.getUserByEmail(request.email);
        throw MainException.invalidData(`User with email ${request.email} already exist`);
      } catch (error: any) {
        if (error instanceof MainException && error.status != 200) {
          throw error;
        }

        user.email = request.email;
      }
    }

    if (request.password) user.password = await bcrypt.hash(request.password, await bcrypt.genSalt(10));

    const savedUser = await this.userRepository.save({
      ...user,
      ...filterUndefined(request),
    });
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async deleteUserById(id: UserEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.userRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }

  async checkEmailForExistAndThrowErrorIfExist(email: string) {
    if (
      await this.userRepository.findOne({
        where: {
          email: email,
        },
      })
    )
      throw MainException.invalidData(`User with email ${email} already exist`);
  }
}
