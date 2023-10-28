import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserRequest } from './dto/create-user.dto';
import { AppSingleResponse } from '../../dto/app-single-response.dto';
import { AppPagination } from '../../utils/app-pagination.util';
import { MainException } from '../../exceptions/main.exception';
import * as bcrypt from 'bcrypt';
import { UpdateUserRequest, UpdateUserResponse } from './dto/update-user.dto';
import { filterUndefined } from '../../utils/filter-undefined.util';
import { AppStatusResponse } from '../../dto/app-status-response.dto';
import { GetUserResponse } from './dto/get-user.dto';

export class BaseUserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(request: CreateUserRequest) {
    await this.checkEmailForExistAndThrowErrorIfExist(request.email);

    const savedUser = await this.userRepository.save(
      this.userRepository.create({
        ...request,
        password: await bcrypt.hash(request.password, await bcrypt.genSalt(10)),
      }),
    );
    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async getUsers(query: AppPagination.Request): Promise<AppPagination.Response<UserEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.userRepository);
    return getPaginatedData(query);
  }

  async getUserById(id: UserEntity['id']): Promise<GetUserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with email ${id} not found`);

    return new GetUserResponse(user);
  }

  async getUserByEmail(email: UserEntity['email']): Promise<GetUserResponse> {
    const user = await this.userRepository.findOne({
      where: {
        email: email,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with email ${email} not found`);

    return new GetUserResponse(user);
  }

  async updateUser(request: UpdateUserRequest): Promise<AppSingleResponse<UserEntity>> {
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

    if (request.firstName) user.firstName = request.firstName;

    if (request.lastName) user.lastName = request.lastName;

    const savedUser = await this.userRepository.save({
      ...user,
      ...filterUndefined(request),
    });

    if (!savedUser) throw MainException.internalRequestError('Error upon saving user');

    return new AppSingleResponse(savedUser);
  }

  async deleteUserById(id: number): Promise<AppStatusResponse> {
    const result = await this.userRepository.softDelete(id);
    return new AppStatusResponse(result.affected > 0);
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
