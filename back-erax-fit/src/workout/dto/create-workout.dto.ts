import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsDateString,
  IsDefined,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { WorkoutEntity } from '../entities/workout.entity';
import { CreateExerciseRequest } from '../../exerсise/dto/create-exercise.dto';
import { Type } from 'class-transformer';

export class CreateWorkoutRequest {
  @IsDefined()
  @IsString()
  @ApiProperty()
  public name: string;

  @IsDefined()
  @IsDateString()
  @ApiProperty()
  public date: string;

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
  public userId: number;

  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseRequest)
  @ApiProperty({ type: [CreateExerciseRequest] })
  public exercises: CreateExerciseRequest[];

  constructor(
    name: string,
    date: string,
    userId: number,
    exercises: CreateExerciseRequest[],
    comment?: string,
    loop?: number,
  ) {
    this.name = name;
    this.date = date;
    this.userId = userId;
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
