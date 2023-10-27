import { Injectable } from '@nestjs/common';
import { CreateUserByAdminRequest, CreateUserRequest, CreateUserResponse } from './dto/create-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { MainException } from '../exceptions/main.exception';
import { GetUserResponse } from './dto/get-user.dto';
import { DeleteUserByIdResponse } from './dto/delete-user-by-id.dto';
import { UserRole } from '../constants/constants';
import { GetUsersRequest, GetUsersResponse } from './dto/get-users.dto';
import { filterUndefined } from 'src/utils/filter-undefined.util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
    console.log();
  }

  async createUser(request: CreateUserRequest | CreateUserByAdminRequest): Promise<CreateUserResponse> {
    await this.checkEmailForExistAndThrowErrorIfExist(request.email);

    const newUser = this.userRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, await bcrypt.genSalt(10)),
      role: request instanceof CreateUserByAdminRequest ? request.role : UserRole.Client,
    });

    const savedUser = await this.userRepository.save(newUser);
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new CreateUserResponse(savedUser);
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

  async getUserByEmail(email: string): Promise<GetUserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with email: ${email} not found`);

    return new GetUserResponse(user);
  }

  async getUserById(id: UserEntity['id']): Promise<GetUserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with id: ${id} not found`);

    user.password = undefined;

    return new GetUserResponse(user);
  }

  async updateUser(request: UpdateUserRequest): Promise<UpdateUserResponse> {
    const { user } = await this.getUserById(request.id);

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

    return new UpdateUserResponse(savedUser);
  }

  async deleteUserById(id: UserEntity['id']): Promise<DeleteUserByIdResponse> {
    const result = await this.userRepository.delete(id);
    return new DeleteUserByIdResponse(result.affected > 0);
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
