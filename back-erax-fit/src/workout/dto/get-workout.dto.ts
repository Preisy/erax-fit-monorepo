import { ApiProperty } from '@nestjs/swagger';
import { WorkoutEntity } from '../entities/workout.entity';
import { ExerciseEntity } from 'src/exerсise/entities/exercise.entity';

export class GetWorkoutResponse {
  @ApiProperty()
  public name: string;
  @ApiProperty()
  public date: string;
  @ApiProperty()
  public comment: string;
  @ApiProperty()
  public loop: number;
  @ApiProperty()
  public userId: number;
  @ApiProperty()
  public exercises: ExerciseEntity[];

  constructor(workout: WorkoutEntity) {
    this.name = workout.name;
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
