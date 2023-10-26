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
    });

    return new GetWorkoutsResponse(workouts, count);
  }

  async getWorkoutsByUserId(id: UserEntity['id'], request: GetWorkoutsRequest): Promise<GetWorkoutsResponse> {
    const user = await this.userRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) throw MainException.entityNotFound(`User with id: ${id} not found`);

    const page = request.page || 1;
    const limit = request.limit || 10;
    const skip = (page - 1) * limit;

    let workouts = user.workouts;
    let count = 0;
    if (workouts != undefined) {
      count = workouts.length;
      workouts = workouts.slice(skip, page * limit);
    } else {
      workouts = [];
    }

    return new GetWorkoutsResponse(workouts, count);
  }

  async getWorkoutById(id: WorkoutEntity['id']): Promise<GetWorkoutResponse> {
    const workout = await this.workoutRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!workout) {
      throw MainException.entityNotFound(`Workout with id: ${id} not found`);
    }
    return new GetWorkoutResponse(workout);
  }

  async createWorkout(request: CreateWorkoutRequest): Promise<CreateWorkoutResponse> {
    let newWorkout = this.workoutRepository.create({
      name: request.name,
      date: new Date(request.date),
      comment: request.comment,
      loop: request.loop,
      userId: request.userId,
      exercises: request.exercises,
    });
    newWorkout.user = await this.userRepository.findOne({
      where: {
        id: newWorkout.userId,
      },
    });
    const savedWorkout = await this.workoutRepository.save(newWorkout);
    if (!savedWorkout) throw MainException.internalRequestError('Error upon saving workout');

    return new CreateWorkoutResponse(savedWorkout);
  }

  async updateWorkout(request: UpdateWorkoutRequest): Promise<UpdateWorkoutResponse> {
    let workout = await this.workoutRepository.findOne({
      where: {
        id: request.id,
      },
    });

    if (request.name) workout.name = request.name;
    if (request.date) workout.date = new Date(request.date);
    if (request.comment) workout.comment = request.comment;
    if (request.loop) workout.loop = request.loop;
    if (request.exercises) workout.exercises = request.exercises;

    const savedWorkout = await this.workoutRepository.save(workout);
    if (!savedWorkout) throw MainException.internalRequestError('Error upon saving workout');

    return new UpdateWorkoutResponse(savedWorkout);
  }

  async deleteWorkoutById(id: WorkoutEntity['id']): Promise<DeleteWorkoutByIdResponse> {
    const result = await this.workoutRepository.softDelete(id);
    return new DeleteWorkoutByIdResponse(result.affected > 0);
  }
}
