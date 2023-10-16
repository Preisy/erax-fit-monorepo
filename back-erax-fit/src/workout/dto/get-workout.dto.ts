import { ApiProperty } from '@nestjs/swagger';
import { WorkoutEntity } from '../entities/workout.entity';

export class GetWorkoutResponse {
  @ApiProperty({ type: WorkoutEntity })
  public workout: WorkoutEntity;

  constructor(workout: WorkoutEntity) {
    this.workout = workout;
  }
}
