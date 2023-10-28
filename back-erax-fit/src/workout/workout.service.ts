import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkoutEntity } from './entities/workout.entity';
import { Repository } from 'typeorm';
import { GetWorkoutsRequest, GetWorkoutsResponse } from './dto/get-workouts.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { MainException } from 'src/exceptions/main.exception';
import { GetWorkoutResponse } from './dto/get-workout.dto';
import { CreateWorkoutRequest, CreateWorkoutResponse } from './dto/create-workout.dto';
import { UpdateWorkoutRequest, UpdateWorkoutResponse } from './dto/update-workout.dto';
import { DeleteWorkoutByIdResponse } from './dto/delete-workout-by-id.dto';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';
import { filterUndefined } from 'src/utils/filter-undefined.util';
import { AppSingleResponse } from 'src/dto/app-single-response.dto';
import { UserService } from 'src/user/user.service';

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

  async getWorkouts(request: GetWorkoutsRequest): Promise<GetWorkoutsResponse> {
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    const [workouts, count] = await this.workoutRepository.findAndCount({
      skip: skip,
      take: limit,
      relations: ['exercises'],
    });

    return new GetWorkoutsResponse(workouts, count);
  }

  async getWorkoutsByUserId(id: UserEntity['id'], request: GetWorkoutsRequest): Promise<GetWorkoutsResponse> {
    let workouts = await this.workoutRepository.find({
      where: {
        userId: id,
      },
      relations: ['exercises'],
    });
    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    let count = 0;
    if (workouts != undefined) {
      count = workouts.length;
      workouts = workouts.slice(skip, page * limit);
    } else {
      workouts = [];
    }

    return new GetWorkoutsResponse(workouts, count);
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
    return new AppSingleResponse(new GetWorkoutResponse(workout));
  }

  async createWorkout(request: CreateWorkoutRequest): Promise<CreateWorkoutResponse> {
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

    return new CreateWorkoutResponse(savedWorkout);
  }

  async updateWorkout(request: UpdateWorkoutRequest) {
    let { data: workout } = await this.getWorkoutById(request.id);
    if (request.exercises) {
      await this.exerciseRepository.delete({
        workoutId: request.id,
      });
      workout.exercises = [];
    }
    const savedWorkout = await this.workoutRepository.save({
      ...workout,
      ...filterUndefined(request),
      date: new Date(request.date!),
    });
    if (!savedWorkout) throw MainException.internalRequestError('Error upon saving workout');
    return new UpdateWorkoutResponse(savedWorkout);
  }

  async deleteWorkoutById(id: WorkoutEntity['id']): Promise<DeleteWorkoutByIdResponse> {
    const result = await this.workoutRepository.delete(id);
    return new DeleteWorkoutByIdResponse(result.affected! > 0);
  }
}
