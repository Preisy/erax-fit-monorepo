import { ApiProperty } from '@nestjs/swagger';
import { WorkoutEntity } from '../entities/workout.entity';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';
import { CreateExerciseRequest } from 'src/exerсise/dto/create.exercise.dto';
import { ArrayNotEmpty, IsDefined, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { GeExerciseResponse } from 'src/exerсise/dto/get.exercise.dto';

export class GetWorkoutResponse {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public id: number;
  @ApiProperty()
  public date: string;
  @ApiProperty()
  public comment: string;
  @ApiProperty()
  public loop: number;
  @ApiProperty()
  public userId: number;
  @IsDefined()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => GeExerciseResponse)
  @ApiProperty({ type: [GeExerciseResponse] })
  public exercises: GeExerciseResponse[];

  constructor(workout: WorkoutEntity) {
    this.name = workout.name;
    this.id = workout.id;
    this.date = workout.date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'numeric',
    });
    this.comment = workout.comment;
    this.loop = workout.loop;
    this.userId = workout.userId;
    this.exercises = workout.exercises;
  }
}
