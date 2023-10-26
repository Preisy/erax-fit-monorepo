import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsDate, IsDateString, IsNumber, IsOptional, IsString } from 'class-validator';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';
import { WorkoutEntity } from '../entities/workout.entity';

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
  @ApiPropertyOptional()
  public exercises?: ExerciseEntity[];

  constructor(id: number, name: string, date: string, comment?: string, loop?: number, exercises?: ExerciseEntity[]) {
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
