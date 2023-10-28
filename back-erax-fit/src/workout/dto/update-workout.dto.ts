import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayNotEmpty, IsDateString, IsDefined, IsOptional, IsString, ValidateNested } from 'class-validator';
import { WorkoutEntity } from '../entities/workout.entity';
import { CreateExerciseRequest } from 'src/exerсise/dto/create-exercise.dto';
import { Type } from 'class-transformer';
import { CreateWorkoutRequest } from './create-workout.dto';

export class UpdateWorkoutRequest extends PartialType(OmitType(CreateWorkoutRequest, ['userId'])) {}

export class UpdateWorkoutResponse {
  @ApiProperty({ type: WorkoutEntity })
  public workout: WorkoutEntity;

  constructor(workout: WorkoutEntity) {
    this.workout = workout;
  }
}
