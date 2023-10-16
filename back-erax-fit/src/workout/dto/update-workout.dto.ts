import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ExerciseEntity } from 'src/exerсise/entity/exercise.entity';
import { WorkoutEntity } from '../entity/workout.entity';

export class UpdateWorkoutRequest {
  public id: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public name?: string;

  @IsOptional()
  @IsDate()
  @ApiPropertyOptional()
  public date?: Date;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public comment?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  public loop?: number;

  @IsOptional()
  @ApiPropertyOptional()
  public exercises?: ExerciseEntity[];

  constructor(
    id: number,
    name: string,
    date: Date,
    comment?: string,
    loop?: number,
    exercises?: ExerciseEntity[],
  ) {
    this.id = id;
    this.name = name;
    this.date = date;
    this.comment = comment;
    this.loop = loop;
    this.exercises = exercises;
  }
}

export class UpdateWorkoutResponse {
  @ApiProperty({ type: WorkoutEntity })
  public workout: WorkoutEntity;

  constructor(workout: WorkoutEntity) {
    this.workout = workout;
  }
}
