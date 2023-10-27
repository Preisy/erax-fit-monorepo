import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsDateString, IsDefined, IsOptional, IsString, ValidateNested } from 'class-validator';
import { WorkoutEntity } from '../entities/workout.entity';
import { CreateExerciseRequest } from 'src/exerсise/dto/create.exercise.dto';
import { Type } from 'class-transformer';

export class UpdateWorkoutRequest {
  @ApiProperty()
  public id: number;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public name?: string;

  @IsOptional()
  @IsDateString()
  @ApiPropertyOptional()
  public date?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  public comment?: string;

  @IsOptional()
  @ApiPropertyOptional()
  public loop?: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExerciseRequest)
  @ApiProperty({ type: [CreateExerciseRequest] })
  public exercises: CreateExerciseRequest[];

  constructor(
    id: number,
    name: string,
    date: string,
    comment?: string,
    loop?: number,
    exercises?: CreateExerciseRequest[],
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
