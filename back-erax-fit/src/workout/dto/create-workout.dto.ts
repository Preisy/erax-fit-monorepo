import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
    IsDate,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { WorkoutEntity } from '../entity/workout.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import { ExerciseEntity } from 'src/exerсise/entity/exercise.entity';

export class CreateWorkoutRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsDefined()
  @IsDate()
  @ApiProperty()
  public date: Date;
  


  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public comment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public loop?: number;

  @IsDefined()
  @ApiProperty()
  public user: UserEntity;

  @IsDefined()
  @ApiProperty()
  public exercises: ExerciseEntity[];


  constructor(
    name: string,
    date: Date,
    user: UserEntity,
    exercises: ExerciseEntity[],
    comment?: string,
    loop?: number,
  ) {
    this.name = name;
    this.date = date;
    this.user = user;
    this.exercises = exercises;
    this.comment = comment;
    this.loop = loop;
  }
}

export class CreateWorkoutResponse {
  @ApiProperty({ type: WorkoutEntity })
  public workout: WorkoutEntity;

  constructor(workout: WorkoutEntity) {
    this.workout = workout;
  }
}
