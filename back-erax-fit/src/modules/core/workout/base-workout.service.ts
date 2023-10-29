import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutEntity } from './entity/workout.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { MainException } from 'src/exceptions/main.exception';
import { GetWorkoutResponse as GetWorkoutDTO } from './dto/get-workout.dto';
import { CreateWorkoutRequest } from './dto/create-workout.dto';
import { UpdateWorkoutRequest } from './dto/update-workout.dto';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppPagination } from 'src/utils/app-pagination.util';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';
import { ExerciseEntity } from '../exerсise/entities/exercise.entity';

@Injectable()
export class BaseWorkoutService {
  constructor(
    @InjectRepository(WorkoutEntity)
    private readonly workoutRepository: Repository<WorkoutEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ExerciseEntity)
    private readonly exerciseRepository: Repository<ExerciseEntity>,
  ) {
    console.log();
  }
  public readonly relations: (keyof WorkoutEntity)[] = ['exercises', 'user'];

  async create(request: CreateWorkoutRequest): Promise<AppSingleResponse<WorkoutEntity>> {
    let newWorkout = this.workoutRepository.create({
      ...request,
      date: new Date(request.date),
    });
    const user = await this.userRepository.findOne({
      where: {
        id: newWorkout.userId,
      },
    });

    if (!user) {
      throw MainException.entityNotFound(`User with id: ${request.userId} not found`);
    }

    if (!user.workouts) user.workouts = [];
    user.workouts.push(newWorkout);
    this.userRepository.save(user);

    const savedWorkout = await this.workoutRepository.save(newWorkout);
    if (!savedWorkout) throw MainException.internalRequestError('Error upon saving workout');

    return new AppSingleResponse(savedWorkout);
  }
  async findAll(
    query: AppPagination.Request,
    options?: AppPagination.GetExecutorOptions<WorkoutEntity>,
  ): Promise<AppPagination.Response<WorkoutEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.workoutRepository, this.relations);
    const { data, count } = await getPaginatedData(query);
    const newData = data.map((it) => ({
      ...it,
      localeDate: it.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    }));
    return new AppPagination.Response(newData, count);
  }

  async findOne(id: WorkoutEntity['id']) {
    const workout = await this.workoutRepository.findOne({
      where: {
        id: id,
      },
      relations: ['exercises'],
    });

    if (!workout) {
      throw MainException.entityNotFound(`Workout with id: ${id} not found`);
    }
    return new AppSingleResponse<GetWorkoutDTO>({
      ...workout,
      localeDate: workout.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    });
  }

  async update(id: WorkoutEntity['id'], request: UpdateWorkoutRequest) {
    let { data: workout } = await this.findOne(id);
    if (request.exercises) {
      await this.exerciseRepository.delete({
        workoutId: id,
      });
      workout.exercises = [];
    }
    const savedWorkout = await this.workoutRepository.save({
      ...workout,
      ...filterUndefined(request),
      date: new Date(request.date!),
    });
    if (!savedWorkout) throw MainException.internalRequestError('Error upon saving workout');
    return new AppSingleResponse<GetWorkoutDTO>({
      ...savedWorkout,
      localeDate: workout.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    });
  }

  async deleteOne(id: WorkoutEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.workoutRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }
}
