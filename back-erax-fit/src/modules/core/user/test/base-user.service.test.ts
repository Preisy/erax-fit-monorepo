import { Test, TestingModule } from '@nestjs/testing';
import { BaseUserService } from '../base-user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserRequest } from '../dto/create-user.dto';
import { AppPagination } from '../../../../utils/app-pagination.util';
import { UpdateUserRequest } from '../dto/update-user.dto';

describe('BaseUserService', () => {
  let service: BaseUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BaseUserService],
    }).compile();
    service = module.get<BaseUserService>(BaseUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should create a new user and save it', async () => {
      const request: CreateUserRequest = {
        email: 'e1@mail.ru',
        password: 'Qwertyuiop1',
        firstName: 'Test',
        lastName: 'User',
        age: 33,
        weight: 80,
        weightInYouth: 70,
        height: 190,
        heartDesease: 'none',
        nutritRestrict: 'none',
        gastroDeseases: 'none',
        allergy: 'none',
        kidneyDesease: 'none',
        goals: 'Achieve volume of Arnold Schwarzenegger',
        sportsExp: 'push-ups',
        mealIntolerance: 'none',
        insulinResistance: false,
        muscleDesease: 'none',
        loadRestrictions: 'none',
      };
      const savedUser = await service.create(request);
      expect(savedUser).toBeDefined();
      expect({ data: savedUser.data }).toBeDefined();
    });
  });

  describe('getUsers method', () => {
    it('should return an AppPaginationResponse', async () => {
      const query = {
        page: 1,
        perPage: 10,
      } as AppPagination.Request;

      const result = await service.getUsers(query);

      expect(result).toBeInstanceOf(AppPagination.Response);
      expect(result.data).toBeInstanceOf(AppPagination.Response<UserEntity>);
    });
  });

  describe('getUserById method', () => {
    it('should find user record by its ID', async () => {
      const id = 1;
      const user = await service.getUserById(id);
      expect(user).toBeDefined();
      expect({ data: user }).toBe(id);
      expect({ data: user.data }).toBeDefined();
    });
  });

  describe('getUserByEmail method', () => {
    it('should find user record by its email', async () => {
      const email = 'e1@mail.ru';
      const user = await service.getUserByEmail(email);
      expect(user).toBeDefined();
      expect({ data: user }).toBe(email);
      expect({ data: user.data }).toBeDefined();
    });
  });

  describe('update method', () => {
    it('should update an existing user record', async () => {
      const id = 2;
      const updateRequest: UpdateUserRequest = {
        height: 200,
        weight: 100,
        weightInYouth: 85,
        heartDesease: 'heart shortage',
      };
      const savedUser = await service.updateUser(id, updateRequest);
      expect(savedUser).toBeDefined();
      expect({ data: savedUser }).toBe(id);
      expect({ data: savedUser.data }).toBeDefined();
    });
  });

  describe('delete method', () => {
    it('should delete an user record by its ID', async () => {
      const id = 3;
      const affected = await service.deleteUserById(id);
      expect(affected).toBeDefined();
      expect(affected).toBe(1);
    });
  });
});
