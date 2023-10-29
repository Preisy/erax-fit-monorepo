import { Injectable } from '@nestjs/common';
import { CreateUserByAdminRequest, CreateUserRequest } from './dto/create-user.dto';
import { UpdateUserRequest } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { MainException } from '../exceptions/main.exception';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { UserRole } from '../constants/constants';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { AppSingleResponse } from '../dto/app-single-response.dto';
import { filterUndefined } from '../utils/filter-undefined.util';

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

    const savedUser = await this.userRepository.save(
      this.userRepository.create({
        ...request,
        password: await bcrypt.hash(request.password, await bcrypt.genSalt(10)),
        role: request instanceof CreateUserByAdminRequest ? request.role : UserRole.Client,
      }),
    );
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async getUsers(request: GetUsersRequest): Promise<GetUsersResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [users, count] = await this.userRepository.findAndCount({
      skip: skip,
      take: limit,
    });

    return new GetUsersResponse(users, count);
  }

  async getUserByEmail(email: string): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
      relations: ['token'],
    });

    if (!user) throw MainException.entityNotFound(`User with email ${email} not found`);

    return new AppSingleResponse(user);
  }

  async getUserById(id: number, role?: UserRole): Promise<AppSingleResponse<UserEntity>> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
        role: role,
      },
      relations: ['token'],
    });

    if (!user) throw MainException.entityNotFound(`User with id ${id} not found`);

    return new AppSingleResponse(user);
  }

  async updateUser(id: UserEntity['id'], request: UpdateUserRequest): Promise<AppSingleResponse<UserEntity>> {
    const { data: user } = await this.getUserById(id);

    if (request.password) request.password = await bcrypt.hash(request.password, await bcrypt.genSalt(10));
    const savedUser = await this.userRepository.save({
      ...user,
      ...filterUndefined(request),
    });

    return new AppSingleResponse(savedUser);
  }

  async deleteUserById(id: number): Promise<DeleteUserByIdResponse> {
    const { affected } = await this.userRepository.delete(id);
    return new DeleteUserByIdResponse(!!affected);
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
