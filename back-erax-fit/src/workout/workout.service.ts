import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { Repository } from 'typeorm';
//import { GetWorkoutsResponse } from './dto/get-workouts.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { MainException } from 'src/exceptions/main.exception';
import { GetWorkoutResponse as GetWorkoutDTO } from './dto/get-workout.dto';
import { CreateWorkoutRequest } from './dto/create-workout.dto';
import { UpdateWorkoutRequest } from './dto/update-workout.dto';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { AppPagination } from 'src/utils/app-pagination.util';
import { AppStatusResponse } from 'src/dto/app-status-response.dto';

@Injectable()
export class WorkoutService {
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

  async getWorkouts(query: AppPagination.Request): Promise<AppPagination.Response<WorkoutEntity>> {
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

  async getWorkoutsByUserId(
    id: WorkoutEntity['userId'],
    query: AppPagination.Request,
  ): Promise<AppPagination.Response<WorkoutEntity>> {
    const { getPaginatedData } = AppPagination.getExecutor(this.workoutRepository, this.relations);
    const { data, count } = await getPaginatedData(query, {
      where: {
        userId: id,
      },
    });
    const newData = data.map((it) => ({
      ...it,
      localeDate: it.date.toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'numeric',
      }),
    }));
    return new AppPagination.Response(newData, count);
  }

  async getWorkoutById(id: WorkoutEntity['id']) {
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

  async createWorkout(request: CreateWorkoutRequest): Promise<AppSingleResponse<WorkoutEntity>> {
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

  async updateWorkout(id: WorkoutEntity['id'], request: UpdateWorkoutRequest) {
    let { data: workout } = await this.getWorkoutById(id);
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

  async deleteWorkoutById(id: WorkoutEntity['id']): Promise<AppStatusResponse> {
    const { affected } = await this.workoutRepository.delete(id);
    return new AppStatusResponse(!!affected);
  }
}
